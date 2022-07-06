const multer = require('multer');
const fs = require('fs');

const docFiles = multer.diskStorage({

    destination: (req,file,cb)=>{
        const {doc_id}= req.body;
    if(file.fieldname === 'doc_prof'){
        var dir = `./uploads/${doc_id}`
        
    }
    else if (file.fieldname ==='doc_govtid') {
        var dir = `./uploads/${doc_id}`
    } else if(file.fieldname ==='doc_educert') {
        var dir = `./uploads/${doc_id}`
    }
    else if(file.fieldname ==='doc_expcert') {
        var dir = `./uploads/${doc_id}`
    }
    fs.exists(dir, exist => {
        if (!exist) {
          return fs.mkdir(dir, error => cb(error, dir))
        }
        return cb(null, dir)
      })

    },
    filename: (req,file,cb)=>{
        
        const ext = file.originalname.substr(file.originalname.lastIndexOf("."));
        const {doc_id}= req.body;
        cb(null,doc_id+"-"+file.fieldname+"-"+Date.now()+ext)
        
    }
})

const docFile= multer({storage: docFiles })


module.exports = {docFile};