const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    doc_id:{type:mongoose.Schema.Types.ObjectId, ref:"doctor",require:true},
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:"user",require:true},
    date: {type: String,require:true},
    time: {type: String,require:true},
    bookingDate: Date,
    paymentDetails: [Object]
    
});

module.exports = mongoose.model("appointment", appointmentSchema);
