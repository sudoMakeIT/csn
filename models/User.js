const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const User = new Schema({
   username: {
       type: String,
       required: true
   },
   pw: {
       type: String,
       required: true
   }
});

mongoose.model("users",User);

