const hubspot = require('../hubspot');
const userSchema = require('../models/user')


const getmeetdet = async (req,res)=>{
    const {email} = req.params
    
    try {
         hubspot.getuserID(email)
        const userdata1 = await userSchema.findOne({u_email:email})
        res.json(userdata1);
       
    } catch (error) {
        res.json({error})
        console.log(error);
    }
}

module.exports ={getmeetdet}