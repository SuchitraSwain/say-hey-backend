const multer = require('multer');


const storage =multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,'uploads');
    },
    filename: (req,file,cb)=>{
        const ext = file.originalname.substr(file.originalname.lastIndexOf("."));

        cb(null,file.fieldname+"-"+Date.now()+ext)
    }
})

upload = multer({storage: storage})

module.exports = upload;