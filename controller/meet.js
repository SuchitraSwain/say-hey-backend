const hubspot = require('../hubspot');
const userSchema = require('../models/user')

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

const getmeetdet = async (req,res)=>{
    const {email} = req.params
    
    try {
        const hub = hubspot.getuserID(email)
        hub.then((value)=>{
          hubspot.getEngagement(value,email,res)
          // engagement.then(()=>{
          //   userSchema.findOne({u_email:email}).then((value)=>{
          //   res.json(value)
          //   console.log('yeah')
          //   })
          // })
          
        })
        // await sleep(2000)
        
       
    } catch (error) {
        res.json({error})
        console.log(error);
    }
}

module.exports ={getmeetdet}