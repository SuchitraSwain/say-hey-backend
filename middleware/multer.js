const multer = require('multer');
const fs = require('fs')

const user_image =multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,'uploads/image');
    },
    filename: (req,file,cb)=>{
        const ext = file.originalname.substr(file.originalname.lastIndexOf("."));

        cb(null,file.fieldname+"-"+Date.now()+ext)
    }
})

const upload = multer({storage: user_image})



const userRecord =multer.diskStorage({
    destination: (req,res,cb)=>{
        const {id } = req.params
        if(res.fieldname=== 'image'){

            const dir = `./uploads/${id}`
            fs.exists(dir, exist => {
            if (!exist) {
              return fs.mkdir(dir, error => cb(error, dir))
            }
            return cb(null, dir)
          })
        }
        if(res.fieldname=== 'record'){
            const dir = `./uploads/${id}`
            fs.exists(dir, exist => {
            if (!exist) {
              return fs.mkdir(dir, error => cb(error, dir))
            }
            return cb(null, dir)
          })
        }
    },
    filename: (req,file,cb)=>{
        
        const ext = file.originalname.substr(file.originalname.lastIndexOf("."));
        // if(ext!==".jpg"&& ext!==".jpeg"&& ext!==".png"){
        //     cb(new Error("File type is not supported"),false);
        //     return;
        //   }
          const { id } = req.params
        cb(null,id+"-"+file.fieldname+"-"+Date.now()+ext)
        
    }
})



const records = multer({storage: userRecord })


module.exports = {upload,records};