
require("dotenv").config()
const doctorSchema = require('./models/doctor')
const userSchema = require('./models/user')
var request = require("request")
var axios = require("axios")


const API_KEY = process.env.YOUR_HUBSPOT_API_KEY


var http = require("https");
const e = require("express");

const getEngagement = async (userid,email) => {
  var options = {
    "method": "GET",
    "hostname": "api.hubapi.com",
    "port": null,
    "path": `/engagements/v1/engagements/associated/contact/${userid}/paged?limit=10&hapikey=${API_KEY}`,
    "headers": {
      "accept": "application/json"
    }
  };
  var joindetails =[]
  var req = http.request(options, async (res)=> {
    var chunks = [];
    
   res.on("data",  function (chunk) {
      chunks.push(chunk);
    });
    
     res.on("end", async ()=> {
      var body = Buffer.concat(chunks);
      const parsed =  JSON.parse(body.toString()).results
      try {
        const userdata = await userSchema.findOneAndUpdate(
          {u_email:email},
          {$set:{
            appointments: []
          }}
          )
        console.log(userdata);
        if(parsed){
          
          var docemails 
            parsed.forEach( async (element) => {
            
            const owner =  element.engagement.ownerId
            docemails = await docdetails(owner,email)
            const docdata1 = await doctorSchema.findOne({doc_email:docemails})
              await userSchema.findOneAndUpdate(
              {u_email:email},
              {$push:{
                appointments: {...element,docdata1}
              }}
              )
          });
          
          
        }
        
      } catch (error) {
        console.log(error)
      }

    });
  });
  req.end()
}

const docdetails =async (owner,email)=>{
  var options = {
    method: 'GET',
    url: `https://api.hubapi.com/owners/v2/owners/${owner}`,
    qs: { hapikey: process.env.YOUR_HUBSPOT_API_KEY }
  }
  var doc_email
  
  const req = await axios.get(`https://api.hubapi.com/owners/v2/owners/${owner}?hapikey=${process.env.YOUR_HUBSPOT_API_KEY}`) 
  return req.data.email;
  


}




const getuserID = (email) => {

  var request = require("request");

  var options = {
    method: 'GET',
    url: `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile`,
    qs: { hapikey: API_KEY }
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const parsed = JSON.parse(body)
    getEngagement(parsed.vid,email)
    
  });


}



module.exports = { getuserID }
