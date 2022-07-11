
const userSchema = require('../models/user')
const userRecordSchema = require('../models/userRecord')

const jwt = require('jsonwebtoken');



const updateData = async (req,res)=>{
   const{id}= req.params;
   const image = req.file;

    try {
        if(!image){
            res.send("file not uploaded")
        }
        res.send(image.filename);
        const updateduser = await userSchema.updateOne(
         {u_mno: id},
         {$set:{
             fname : req.body.fname,
             lname: req.body.lname,
             u_email:req.body.email,
             u_pass:req.body.password,
             user_prof:image.filename
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
        u_mno:req.body.mno,
        u_pass:req.body.password,
        user_prof:req.body.profile,
        refreshToken:req.body.stsTokenManager.refreshToken,
        accessToken: req.body.stsTokenManager.accessToken,
        uid:req.body.uid,
    })
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.json({message:error})
        
    }


}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

const getUser= async (req,res)=>{

    const {id} = req.params;
    try {
        const data= await userSchema.findOne(ValidateEmail(id) ? {"u_email":id}:{"u_mno":id} );
        let jwtSecretKey = data.accessToken;
        const token = jwt.sign({data}, jwtSecretKey);

        res.status(200).send(token);
    } catch (error) {
        console.log(error);
        res.json({message: error});
    }
}



const viewUser = async (req,res)=>{
    try {
        const data= await userSchema.find();
        res.status(200).json({data});
    } catch (error) {
        res.json({message: error});
    }
}

const addrecords =  async (req,res)=>{
    const {id} = req.params;
    const files = req.files;

    try {
        var imageArr= [];
        var fileArr=[];
        files.forEach(element => {
            if(element.fieldname=== 'image'){
                imageArr.push(element.filename)

                }
                if(element.fieldname=== 'record'){
                    fileArr.push(element.filename)
                }
            }
        );
        const recordSchema= new userRecordSchema({
            uid: id,
            image:imageArr,
            medical_files:fileArr
        }) ;
        await recordSchema.save()
        res.status(201).send('Files Uploaded Successfully');

    } catch (error) {
        console.log(error);
        res.status(400).send(error);

    }

}

module.exports = {updateData,viewUser,createUser,getUser,addrecords};