const dotenv = require("dotenv");
const crypto =  require("crypto");
const Razorpay=require("razorpay");
const paymentSchema = require('../models/payment');
const { param } = require("../routes/doctor");
const userSchema = require('../models/user');
const { async } = require("@firebase/util");
const { error } = require("console");


dotenv.config();

const instance= new Razorpay({
    key_id: process.env.RAZOR_API,
    key_secret: process.env.RAZOR_SECRET
});




 
const createorder= async(req,res) =>{
    const params=req.body;
    const payment_capture =1;
    const options = {
		amount: params.amount,
		currency: params.currency,
		receipt: params.receipt,
        payment_capture

		
	}
    try {
        const data = await instance.orders.create(options, async(err,order)=>{
       
            if(err){
                console.log(err);
                res.json({err})
            }else{
                userSchema.findOne({"uid":req.body.user_id}).then((value)=>{
                        const payment = paymentSchema({
                            engagment_id: params.engagment_id,
                            user_id: value._id,
                            order: order,
                            paymentVerify:false
                        })
                        payment.save().then((saved_payment)=>{
                            console.log(saved_payment)
                            res.json(saved_payment)
                        }).catch((err)=>{
                            console.log(err)
                        })  
                }).catch((err)=>{
                    res.json(err)
                    console.log(err);
                })
                // const userdata1 = await userdata.find({"uid":req.body.user},{awards: {$elemMatch: {appointments:'Turing Award', year:1977}}})
                        // console.log(userdata)
                        // const payment = await  new paymentSchema({
                        //     engagment_id: params.engagment_id,
                        //     user_id: userdata._id,
                        //     order: order
                        // })
                        // const savedpay = await  payment.save()
                        // res.json(savedpay)
            }
           // res.send({sub:data, status:"success"})\
                   
                })
    } catch (error) {
        console.log(error);
        res.json({error})
    }
            
            

        

    
    
}

const verifyorder= async(req,res) =>{
    body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var expectedSignature =crypto
    .createHmac("sha256",process.env.RAZOR_SECRET)
    .update(body.toString())
    .digest("hex")
    console.log("sig" + req.body.razorpay_signature)
    console.log("sig"+ expectedSignature)
    var response= {status :"failure"}
    if (expectedSignature === req.body.razorpay_signature){
        response ={status: "success"}
        console.log(req.body.eng_id);
        try {
            const data =await paymentSchema.findOne({engagment_id:req.body.eng_id})
            await paymentSchema.updateOne({engagment_id:req.body.eng_id},{$set:{paymentVerify:true}})  
            const uid = data.user_id;
            console.log(uid)
            const userdata = await userSchema.updateOne({
                _id:uid,
                appointments: {
                    '$elemMatch': {
                        // payment :true
                      'engagement.id': parseFloat(req.body.eng_id)
                    }
                  },
            },
            {
                $set:{
                    "appointments.$.payment": true
                    
                }
            }
            )
            // console.log("hello");
            if (userdata) {
                console.log(userdata);

            }
        } catch (error) {
            console.log(error)
        }


    }
    res.send(response)
}

module.exports ={ createorder,verifyorder}