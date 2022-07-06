const doctorSchema = require('../models/doctor')


const viewdoctor = async (req,res)=>{
    try {
        const data= await doctorSchema.find();
        res.status(200).json({data});
    } catch (error) {
        res.json({message: error});
    }
}

const getdoc =async (req,res)=>{

    const {id} = req.params;
    try {
        const data= await doctorSchema.findOne({"doc_id":id} );
        

        res.status(200).send(data);
    } catch (error) {
        res.json({message: error});
    }
}

const activedoc =async (req,res)=>{
    try {
        const data= await doctorSchema.find({"status":"active"} );
        

        res.status(200).send(data);
    } catch (error) {
        res.json({message: error});
    }
}

module.exports ={viewdoctor,getdoc,activedoc}