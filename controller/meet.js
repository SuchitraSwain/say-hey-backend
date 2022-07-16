const hubspot = require('../hubspot');
const userSchema = require('../models/user')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const getmeetdet = async (req,res)=>{
    const {email} = req.params
    
    try {
        await hubspot.getuserID(email)
        .then(()=>{userSchema.findOne({u_email:email})
        .then((data)=>res.json(data))
    })
        // const userdata1 = await userSchema.findOne({u_email:email})
        // res.json(userdata1);
       
    } catch (error) {
        res.json({error})
        console.log(error);
    }
}

module.exports ={getmeetdet}