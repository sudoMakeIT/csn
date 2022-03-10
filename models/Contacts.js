const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Contacts = new Schema({
    toWhat: {
        type: String,
        required: true
    },
    icon: {
        type:String
    },
    text1: {
        type: String

    },
    text2: {
        type: String
    }
});

mongoose.model("contacts",Contacts);



