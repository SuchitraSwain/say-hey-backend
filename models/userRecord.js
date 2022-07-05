const mongoose = require("mongoose");

const userRecordSchema = mongoose.Schema({
    uid: {type: String, require: true,unique:true },
    image:[Object],
    medical_files:[Object]
  })
  
  module.exports = mongoose.model("userRecord", userRecordSchema);