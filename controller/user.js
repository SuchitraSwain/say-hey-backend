
const userSchema = require('../models/user')
const userRecordSchema = require('../models/userRecord')
const fs = require('fs');
function base64_encode(file) {
    return   fs.readFileSync(file, 'base64');
}

const jwt = require('jsonwebtoken');
const {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    deleteObject,
  } = require("firebase/storage");
  const storage = require("../firebase");


const updateData = async (req,res)=>{
   const{id}= req.params;
   const image = req.file

    try {
        const imagebuffer = "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"
        // var base64str = base64_encode(image.path);
        //     console.log(base64str);
        
        const imageRef = ref(storage,req.body.filename);
        // const metatype = { contentType: image.mimetype, name: image.originalname };
        await uploadBytes(imageRef,imagebuffer)
            .then((snapshot) => {
                    getDownloadURL(snapshot.ref).then(url=>{
                            console.log(url);
                        })
                    })
                    .catch((error) => console.log(error));
        
        const updateduser = await userSchema.updateOne(
         {u_mno: id},
         {$set:{
             fname : req.body.fname,
             lname: req.body.lname,
             user_prof:image.filename
         }}
        );
        res.json({status:"updated"});
    } catch (error) {
        res.json({message: error})
        console.log(error);
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