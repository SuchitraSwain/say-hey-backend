const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    appointment_id:{type:mongoose.Schema.Types.ObjectId, ref:"appointment",require:true},
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:"user",require:true},
    date: {type: date,require:true},
    paymentMethod:{type:String,require:true},
    cardno: String,
    name: String,
    expiry: String,
    cvv: String
});

module.exports = mongoose.model("payment", paymentSchema);
