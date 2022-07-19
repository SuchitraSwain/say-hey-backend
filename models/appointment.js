const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    doc_id:{type:mongoose.Schema.Types.ObjectId, ref:"doctor",require:true},
    doc_email:{type:String},
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:"user",require:true},
    engagement_id: {type: Number ,require:true,unique:true},
    details: Object
    
});

module.exports = mongoose.model("appointment", appointmentSchema);
