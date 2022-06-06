const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const upload = require('../helpers/uploadMiddleware');
const Resize = require('../helpers/Resize');

require("../models/User");
const User = mongoose.model("users");
require("../models/Contacts");
const Contacts = mongoose.model("contacts");
require("../models/Services");
const Services = mongoose.model("services");
require("../models/Others");
const Others = mongoose.model("others");
require("../models/Images");
const Images = mongoose.model("images");
require("../models/Afiliados");
const Afiliados = mongoose.model("afiliados");

router.get("/", function (req,res) {
    res.render('loginForm');
});

router.get("/logout", (req,res) => {
    req.logout();
    res.redirect("/admin");
});




router.post("/updateOthers", function (req,res) {
    Others.findOne({_id:req.body.id}).then((other) => {
        other.title = req.body.title;
        other.text = req.body.text;

        new Others(other).save().then(()=> {
            //console.log("sucesso");
            res.redirect(307,'/adminUpdate');
        }).catch((err) => {
            //console.log("erroOthers " + err);
            res.send("ERRO BD CONTACT DEVELOPER " + err);
        });

    }).catch((error)=> {
        res.send("ERRO BD CONTACT DEVELOPER " + error);
    });


});

router.post("/editImage", function (req,res) {
    Images.findOne({_id:req.body.id}).then((img) => {
        img.nome = req.body.name;
        img.lg1 = req.body.lgTitle;
        img.lg2 = req.body.lg;

        new Images(img).save().then(()=> {
            //console.log("sucesso");
            res.redirect(307,'/adminUpdate');
        }).catch((err) => {
            res.send("ERRO BD CONTACT DEVELOPER " + err);

        });

    }).catch((error)=> {
        res.send("ERRO BD CONTACT DEVELOPER " + error);
    });


});

router.post("/addImages",  upload.single('file'),  async function (req,res) {
    const imagePath = path.join(__dirname, '../public/img/project/');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    } else{
        const filename = await fileUpload.save(req.file.buffer);

        const newImage = {
            to: "teste",
            path: filename,
            nome: req.body.name,
            lg1: req.body.lgTitle,
            lg2 : req.body.lg
        };

        new Images(newImage).save().then(()=> {
            //console.log("sucesso")
            res.redirect(307,'/adminUpdate');
        }).catch((err) => {
            res.send("ERRO BD CONTACT DEVELOPER " + err);
        });
    }
});

router.post("/deleteImage", function (req,res) {
    var imgPath;
    Images.findOne({_id:req.body.id}).then((other) => {
        imgPath = "./public/img/project/" + other.path;
        //console.log(imgPath);
        try {
            fs.unlinkSync(imgPath);
            //file removed
            Images.deleteOne({_id: req.body.id}).then(()=> {
                //console.log("sucesso")
                res.redirect(307,'/adminUpdate');
            }).catch((err) => {
                res.send("ERRO BD CONTACT DEVELOPER " + err);
            });
        } catch(err) {
            res.send("ERRO BD CONTACT DEVELOPER " + err);
        }
    }).catch((error)=> {
        res.send("ERRO BD CONTACT DEVELOPER " + error);
    });
});

router.post("/updateContacts", function (req,res) {
    Contacts.findOne({_id:req.body.id}).then((other) => {
        other.text1 = req.body.text1;
        other.text2 = req.body.text2;

        console.log("other " + other);
        new Contacts(other).save().then(()=> {
            res.redirect(307,'/adminUpdate');
        }).catch((err) => {
            res.send("ERRO BD CONTACT DEVELOPER " + err);

        });

    }).catch((error)=> {
        res.send("ERRO BD CONTACT DEVELOPER " + error);
    });


});

router.post("/updateServices", function (req,res) {
    Services.findOne({_id:req.body.id}).then((service) => {
        service.title = req.body.title;
        service.desc = req.body.desc;

        new Services(service).save().then(()=> {
            res.redirect(307,'/adminUpdate');
        }).catch((err) => {
            res.send("ERRO BD CONTACT DEVELOPER " + err);

        });

    }).catch((error)=> {
        res.send("ERRO BD CONTACT DEVELOPER " + error);
    });


});

router.post("/updateAff", function (req,res) {
    Afiliados.findOne({_id:req.body.id}).then((aff) => {
        aff.name = req.body.name;
        aff.text = req.body.text;
        aff.link = req.body.link;

        new Afiliados(aff).save().then(()=> {
            res.redirect(307,'/adminUpdate');
        }).catch((err) => {
            res.send("ERRO BD CONTACT DEVELOPER " + err);

        });

    }).catch((error)=> {
        res.send("ERRO BD CONTACT DEVELOPER " + error);
    });


});


module.exports = router;