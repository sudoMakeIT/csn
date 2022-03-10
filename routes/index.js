var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var passport = require("passport");

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

let othersData;
let affData;
let imageData;
let contactsData;
let servicesData;

/* GET home page. */
router.get('/', function(req, res, next) {
  Others.find().then( (others) => {
    othersData = others;
  }).catch((err) => {
    res.send("ERRO BD CONTACT DEVELOPER " + err);
  });

  Afiliados.find().then( (aff) => {
    affData = aff;
    console.log("AffData", affData)
  }).catch((err) => {
    res.send("ERRO BD CONTACT DEVELOPER " + err);
  });

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
    }).catch((err) => {
      res.send("ERRO BD CONTACT DEVELOPER " + err);
    });

  Contacts.find().then( (contacts) => {
    contactsData = contacts;
  }).catch((err) => {
    res.send("ERRO BD CONTACT DEVELOPER " + err);
  });

  Services.find().then( (services) => {
    servicesData = services;
    res.render('index', {images: imageData, others: othersData, contacts: contactsData, aff:affData,services: servicesData});
  }).catch((err) => {
    res.send("ERRO BD CONTACT DEVELOPER " + err);
  });

});

router.post('/login', function (req,res,next) {
  User.findOne({username: req.body.username}).then((userFound) => {
    if(!userFound) {
      res.redirect('/admin');
    }

    bcrypt.compare(req.body.pw, userFound.pw, (erro, batem) => {
      if(batem) {
        res.redirect(307,'/adminUpdate');
      } else {
        res.redirect('/admin');
      }
    })
  })


});

/*
router.get('/reg', function(req, res, next) {
  const newuser = new User({
    username: 'bruno',
    pw: 'iamdev'
  });

  bcrypt.genSalt(10,(error, s) => {
    bcrypt.hash(newuser.pw, s, ((error1, s1) => {
      if(error1) {
        console.log('erro')
        res.redirect('/erro');
      }

      newuser.pw = s1;

      newuser.save().then(()=> {
        console.log("sucesso");
        res.redirect('/');
      }).catch((err) => {
        console.log("erroOthers " + err);
      });

    }))
  })
});
*/

router.get("/adminUpdate", (req,res) => {
  res.redirect('/admin');
});

router.post("/adminUpdate", (req,res) => {

  Others.find().then( (others) => {
    othersData = others;
    console.log("othersData", othersData)
  }).catch((err) => {
    res.send("ERRO BD CONTACT DEVELOPER " + err);
  });

  Afiliados.find().then( (aff) => {
    affData = aff;
    console.log("AffData", affData)
  }).catch((err) => {
    res.send("ERRO BD CONTACT DEVELOPER " + err);
  });


  Images.find().then( (images) => {
    imageData = images;
  }).catch((err) => {
    res.send("ERRO BD CONTACT DEVELOPER " + err);
  });

  Contacts.find().then( (contacts) => {
    contactsData = contacts;
  }).catch((err) => {
    res.send("ERRO BD CONTACT DEVELOPER " + err);
  });

  Services.find().then( (services) => {
    servicesData = services;
    res.render('updatePage', {images: imageData, others: othersData, aff:affData,contacts: contactsData, services: servicesData});
  }).catch((err) => {
    res.send("ERRO BD CONTACT DEVELOPER " + err);
  });

});


module.exports = router;
