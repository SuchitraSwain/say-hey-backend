const mongoose = require('mongoose');
const userSchema = require('../models/user')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const updateData = async (req,res)=>{
   const{id}= req.params;
   const image = req.file;
//    res.send(typeof(id))
    try {
        // if(!image){
        //     res.send("file not uploaded")
        // }
        // res.send(image.filename);
        const updateduser = await userSchema.updateOne(
         {u_mno: id},
         {$set:{
             fname : req.body.fname,
             lname: req.body.lname,
             u_email:req.body.email,
             u_pass:req.body.password,
            //  user_prof:image.filename
         }}
        );
        res.json({status:"updated"});
    } catch (error) {
        res.json({message: error})
    }

}

const createUser = async (req,res)=>{
    console.log(req.body);
    const name = req.body.displayName.split(' ');
    const user =new userSchema({
        fname : name[0],
        lname: name[1],
        u_email:req.body.email,
        // u_mno:req.body.mno,
        // u_pass:req.body.password,
        // user_prof:req.body.profile
        refreshToken:req.body.stsTokenManager.refreshToken,
        accessToken: req.body.stsTokenManager.accessToken,
        uid:req.body.uid,
    })
    // user.save()
    // .then(data=>{
    //     res.status(200).json(data);
    // })
    // .catch(err=>{
    //     res.json({message: err});
    // })
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.json({message:error})
        
    }

    // res.status(200).send("working fine")
}
const viewUser = async (req,res)=>{
    try {
        const data= await userSchema.find();
        res.status(200).json({data});
    } catch (error) {
        res.json({message: error});
    }
}

module.exports = {updateData,viewUser,createUser};