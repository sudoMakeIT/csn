const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Services = new Schema({
    path: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});

mongoose.model("services",Services);
