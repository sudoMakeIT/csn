const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Images = new Schema({
    to: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    lg1: {
        type: String,
        required: true
    },
    lg2: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    }
});

mongoose.model("images",Images);

