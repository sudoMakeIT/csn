const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Others = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    welcome: {
        type: Boolean,
        required: true
    }
});

mongoose.model("others",Others);