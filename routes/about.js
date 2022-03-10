var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require("../models/Others");
const Others = mongoose.model("others");
require("../models/Contacts");
const Contacts = mongoose.model("contacts");


let othersData;
let contactsData;

/* GET home page. */
router.get('/', function(req, res, next) {
    Contacts.find().then( (contacts) => {
        contactsData = contacts;
    }).catch((err) => {
        res.send("ERRO BD CONTACT DEVELOPER " + err);
    });

    Others.find().then( (others) => {
        othersData = others;
        res.render('about', {others: othersData,contacts: contactsData});
    }).catch((err) => {
        res.send("ERRO BD CONTACT DEVELOPER " + err);
    });
});

module.exports = router;