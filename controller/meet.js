const hubspot = require('../hubspot');
const userSchema = require('../models/user')


const getmeetdet = async (req,res)=>{
    const {email} = req.params
    
    try {
        const hub = hubspot.getuserID(email)
        hub.then((value)=>{
          hubspot.getEngagement(value,email,res)
          
          
        })
        
       
    } catch (error) {
        res.json({error})
        console.log(error);
    }
}

module.exports ={getmeetdet}