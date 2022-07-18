const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    engagment_id:{type:String, ref:"user",require:true},
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:"user",require:true},
    order:Object,
    paymentVerify :Boolean
    
});

module.exports = mongoose.model("payment", paymentSchema);
