const { stringify } = require('@firebase/util');
const appointmentSchema = require('../models/appointment');
const doctorSchema = require('../models/doctor')
const userSchema = require('../models/user')

const docData = (req,res)=>{
    try {
        const email =  req.body.email
        
        appointmentSchema.find({doc_email:email})
       .populate('doc_id')
       .populate('user_id')
       .then((data)=>{

        //    console.log(data);
           res.json(data)
       })
        
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}


module.exports ={docData}