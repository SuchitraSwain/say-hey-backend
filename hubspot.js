require("dotenv").config();
const doctorSchema = require("./models/doctor");
const userSchema = require("./models/user");
const appointmentSchema = require("./models/appointment");
const paymentSchema = require("./models/payment");

var axios = require("axios");

const API_KEY = process.env.YOUR_HUBSPOT_API_KEY;
var http = require("https");
const e = require("express");
const { read } = require("fs");

const getEngagement = (userid, email, res) => {
  
  return axios
    .get(
      `https://api.hubapi.com/engagements/v1/engagements/associated/contact/${userid}/paged?limit=10&hapikey=${API_KEY}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    )
    .then((value) => {
      if (value.data.results) {
        var array = [];
        value.data.results.map((item, index) => {
          const owner = item.engagement.ownerId;
          docdetails(owner).then((docemails) => {
            
            doctorSchema
              .findOne({
                doc_email: docemails,
              })
              .then((docdata1) => {
                // console.log(item.engagement.id);
                var pay = false;
                userSchema.findOne({ u_email: email })
                .then((c)=>{
                  appointmentSchema.find({engagement_id:item.engagement.id},(err, ap)=>{
                    if(ap.length===0){
                          console.log("hello")
                          const appointment = new appointmentSchema({
                            doc_id: docdata1._id,
                            doc_email:docemails,
                            user_id: c._id,
                            engagement_id:item.engagement.id,
                            details:item
                          })
                          appointment.save()
                          .then(console.log("success"))

                    }
                  })
                  
                })
                paymentSchema
                  .findOne({
                    engagment_id: item.engagement.id,
                  })
                  .then((paydata) => {
                    console.log('paydata\n',paydata)
                    if (paydata) {
                      console.log(paydata.user_id);
                      pay = true;
                      array.push({ ...item, docdata1, payment: paydata.paymentVerify });
                      
                    } else {
                      array.push({ ...item, docdata1, payment: false });
                    }
                  })
                  .then(() => {
                    if (value.data.results.length == array.length) {
                      userSchema
                        .findOneAndUpdate(
                          { u_email: email },
                          {
                            $set: {
                              appointments: array,
                            },
                          }
                        )
                        .then((value) => {
                          res.json(value);
                        });
                    }
                  });
              })

              .catch((err) => {
                res.json({ err });
              });
          });
        });

        // })
      }
    })
    .catch((err) => {
      res.json(err);
    });
  // var req = http.request(options, async (res) => {
  //   var chunks = [];

  //   res.on("data", function (chunk) {
  //     chunks.push(chunk);
  //   });

  //   res.on("end", async () => {
  //     var body = Buffer.concat(chunks);
  //     const parsed = JSON.parse(body.toString()).results;
  //     try {
  //       if (parsed) {
  //         await userSchema.findOneAndUpdate(
  //           { u_email: email },
  //           {
  //             $set: {
  //               appointments: [],
  //             },
  //           }
  //         );
  //         console.log("this");
  //         var docemails;
  //         parsed.forEach(async (element) => {
  //           const owner = element.engagement.ownerId;
  //           docemails = await docdetails(owner);

  //           const docdata1 = await doctorSchema.findOne({
  //             doc_email: docemails,
  //           });
  //           await userSchema.findOneAndUpdate(
  //             { u_email: email },
  //             {
  //               $push: {
  //                 appointments: { ...element, docdata1 },
  //               },
  //             }
  //           );
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // });

  // req.end();
};

const docdetails = async (owner) => {
  var options = {
    method: "GET",
    url: `https://api.hubapi.com/owners/v2/owners/${owner}`,
    qs: { hapikey: API_KEY },
  };
  var doc_email;
  try {
    const req = await axios.get(
      `https://api.hubapi.com/owners/v2/owners/${owner}?hapikey=${API_KEY}`
    );

    return req.data.email;
  } catch (error) {
    console.log(error);
  }
};

const getuserID = async (email) => {
  
  try {
    const value = await axios.get(
      `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=${API_KEY}`
    );
    return value.data.vid;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getuserID, getEngagement };
