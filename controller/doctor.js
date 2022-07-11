const doctorSchema = require('../models/doctor')


const createDoc = async (req,res)=>{
    const {doc_id} = req.body;
    const files = req.files;
    const langArr = [];
    const profArr= [];
    const govtidArr=[];
    const educertArr=[];
    const expcertArr=[];
        files.forEach(element => {
            if(element.fieldname=== 'doc_prof'){
                const profile = {
                    filename:element.filename,
                    path: element.path,
                    size: element.size
                }
                profArr.push(profile)

            }else if (element.fieldname ==='doc_govtid') {
                const govtid = {
                    filename:element.filename,
                    path: element.path,
                    size: element.size
                }
                govtidArr.push(govtid)
            } else if(element.fieldname ==='doc_educert') {
                const eduCert = {
                    filename:element.filename,
                    path: element.path,
                    size: element.size
                }
                educertArr.push(eduCert)
            }
            else if(element.fieldname ==='doc_expcert') {
                const expCert = {
                    filename:element.filename,
                    path: element.path,
                    size: element.size
                }
                expcertArr.push(expCert)
            }
                
            }
            );
            // console.log(files);
        req.body.language.forEach(c=>{
            langArr.push(c)
        })
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
            language: langArr,
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


// const addSlots = async(req,res)=>{
//     const {id} = req.params;
//     try {
//         const timeslot = req.body.timeslot;
//         const updateDocument = {
//             $push: { "slots.$[].date": Date() }
//         };
//         const data= await doctorSchema.updateOne({"doc_id":id},updateDocument);

//         res.json(data);
//     } catch (error) {
//         console.log(error)  
//         res.json({message: error})

//     }

// }


 
 


module.exports = {createDoc,statAct,statnotAct}; 