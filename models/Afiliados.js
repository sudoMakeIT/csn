const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Afiliados = new Schema({
    link: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

mongoose.model("afiliados",Afiliados);