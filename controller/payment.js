const dotenv = require("dotenv");
const crypto =  require("crypto");
const Razorpay=require("razorpay");


dotenv.config();

const instance= new Razorpay({
    key_id: process.env.RAZOR_API,
    key_secret: process.env.RAZOR_SECRET
});




 
const createorder=(req,res) =>{
    params=req.body;
    instance.orders
    .create(params)
    .then((data)=>{
        res.send({sub:data, status:"success"})
    })
    .catch((error)=>{
        res.send({sub:error, status:"failed"})
    })
}

const verifyorder=(req,res) =>{
    body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var expectedSignature =crypto
    .createHmac("sha256",process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex")
    console.log("sig" + req.bosy.razorpay_signature)
    console.log("sig"+ expectedSignature)
    var response= {status :"failure"}
    if (expectedSignature === req.body.razorpay_signature)
    response ={status: "success"}
    res.send(response)
}

module.exports ={ createorder,verifyorder}