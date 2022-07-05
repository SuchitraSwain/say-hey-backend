const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  doc_name: {type: String,require: true,},
  doc_id: { type: String, require: true,unique:true },
  doc_email: { type: String, require: true,unique:true },
  doc_mno: { type: String, require: true },
  doc_pass:{type:String,require: true},
  gender: { type: String, require: true },
  age: { type: Number, require: true },
  location: { type: String, require: true },
  qualification: { type: String, require: true },
  experience: { type: String, require: true },
  specialist: { type: String, require: true },
  decription: { type: String, require: true },
  // doc_prof: String
  // doc_govtid: String
  // doc_educert: String
  // doc_expcert: String
//   refreshToken: { type: String, require: true },
//   accessToken: { type: String, require: true },
});

module.exports = mongoose.model("doctor", doctorSchema);
