const doctorSchema = require('../models/doctor');
const { all } = require('../routes/doctor');



const viewdoctor = async (req,res)=>{
    console.log(req.query)
    const{type,language,gender}= req.query
    try {
        if(type && language && gender) {
            const data= await doctorSchema.find({gender:gender,specialist:type,language:language});
            res.status(200).json({data});    
        }
        else if(type && language && gender) {
            const data= await doctorSchema.find({gender:gender,specialist:type,language:language});
            res.status(200).json({data});    
        }
        else if(gender && type) {
            const data= await doctorSchema.find({gender:gender,specialist:type});
            res.status(200).json({data});    
        }else if(gender&& language) {
            const data= await doctorSchema.find({gender:gender,language:language});
            res.status(200).json({data});    
        }
        else if(type){
            const data= await doctorSchema.find({specialist:type});
            res.status(200).json({data});
        }else if (language) {
            const data= await doctorSchema.find({language:language});
            res.status(200).json({data});
        } else if(gender) {
            const data= await doctorSchema.find({gender:gender});
            res.status(200).json({data});    
        }
        else{
            const data= await doctorSchema.find();
            
            res.status(200).json({data});    
        }
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

const docRank = async(req,res)=>{
    try {
        const data= await doctorSchema.find().sort({rating:-1})
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.json({message: error});
    }

}

const search = async (req,resp)=>{
//      const query = { $text: { $search: "trek" } };
//   // Return only the `title` of each matched document
//   const projection = {
//     _id: 0,
//     title: 1,
//   };

    let data = await doctorSchema.find(
        {
            "$or":[
                
                {doc_name:{$regex:req.params.key, $options: 'i'}},
                {qualification:{$regex:req.params.key, $options: 'i'}},
                {specialist:{$regex:req.params.key, $options: 'i'}}

                
            
            ]
        }
    )
    resp.send(data);

}

module.exports ={viewdoctor,getdoc,activedoc,docRank,search}