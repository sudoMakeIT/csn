var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require("../models/Images");
const Images = mongoose.model("images");


let othersData;
let contactsData;

/* GET home page. */
router.get('/', function(req, res, next) {
    imageData = []
    Images.distinct("nome").then( (proj) => {
        proj.forEach(element => {
           Images.findOne({nome : element}).then( (image) => {
                // console.log(element)
                imageData.push(image)
                // console.log(image)
           }).catch((err) => {
            res.send("ERRO BD CONTACT DEVELOPER " + err);
          });
        });
        // console.log(imageData)
        res.render('projetos', {images: imageData});
      }).catch((err) => {
        res.send("ERRO BD CONTACT DEVELOPER " + err);
      });
});

router.post('/showProj', function(req,res,next) {
    // res.send(req.body.pname)
    Images.find({nome: req.body.pname}).then( (images) => {
        imageData = images;
        res.render('portfolio', {pname: req.body.pname, images: imageData});
    }).catch((err) => {
        res.send("ERRO BD CONTACT DEVELOPER " + err);
    });
});

module.exports = router;