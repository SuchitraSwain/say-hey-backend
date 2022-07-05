const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fname: {type: String,require: true,},
  lname: { type: String, require: true },
  u_email: { type: String, require: true ,unique:true},
  u_mno: { type: String, require: true, unique:true },
  refreshToken: { type: String, require: true },
  accessToken: { type: String, require: true },
  uid: { type: String, require: true },
  u_pass:{type:String,require: true},
  medical_files:{  type:Array},
  user_prof: String
});

module.exports = mongoose.model("user", userSchema);
