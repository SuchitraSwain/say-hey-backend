const doctorSchema = require('../models/doctor')


const createDoc = async (req,res)=>{
    const {doc_id} = req.body;
    const files = req.files;
    var profArr= [];
    var govtidArr=[];
    var educertArr=[];
    var expcertArr=[];
        files.forEach(element => {
            if(element.fieldname=== 'doc_prof'){
                profArr.push(element.filename)

            }else if (element.fieldname ==='doc_govtid') {
                govtidArr.push(element.filename)
            } else if(element.fieldname ==='doc_educert') {
                educertArr.push(element.filename)
            }
            else if(element.fieldname ==='doc_expcert') {
                expcertArr.push(element.filename)
            }
                
            }
        );
        const doctor= new doctorSchema({
            doc_id: doc_id,
            doc_name: req.body.name,
            doc_email: req.body.email,
            doc_mno: req.body.mno,
            doc_pass: req.body.password,
            gender: req.body.gender,
            age: Number(req.body.age),
            location: req.body.location,
            status: req.body.status,
            qualification: req.body.qualification,
            experience: req.body.experience,
            specialist: req.body.specialist,
            decription: req.body.decription,
            rating: req.body.rating,
            price: req.body.price,
            language: req.body.language,
            timing: req.body.timing,
            doc_prof: profArr,
            doc_govtid: govtidArr,
            doc_educert:educertArr,
            doc_expcert:expcertArr
        }) ;
        try {
            const savedDoc = await doctor.save();
        res.json(savedDoc);
        } catch (error) {
            res.json({message:error})
        }
}

const statAct =async (req,res)=>{
    const{id}= req.params;
     try {
         

         await doctorSchema.updateOne(
          {doc_id: id},
          {$set:{
              status:"active"
          }}
         );
         res.json({status:"updated"});
     } catch (error) {
        console.log(error);
         res.json({message: error})
     }
 
 }

 const statnotAct =async (req,res)=>{
    const{id}= req.params;
     try {
         

         await doctorSchema.updateOne(
          {doc_id: id},
          {$set:{
              status:"not active"
          }}
         );
         res.json({status:"updated"});
     } catch (error) {
        console.log(error);
         res.json({message: error})
     }
 
 }


 
 


module.exports = {createDoc,statAct,statnotAct}; 