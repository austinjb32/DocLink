//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
var useragent = require('express-useragent');
var nodemailer = require('nodemailer');
const https = require('https');
require('dotenv').config()


const app = express();

const userRoute= require('./routes/userRoute'); 

app.set('view engine', 'ejs');
const url="mongodb+srv://austinjb32:"+process.env.MONGO_PASSWORD+"@cluster0.qw08n.mongodb.net/medApp?retryWrites=true"

mongoose.connect(process.env.MONGOURL || url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  // if(data)
  //     console.log("db success", data)
  // if(error)
  //     console.log("db error", error)
  console.log("Db connected")
}).catch((ex) => {
  console.log("Db connection error")
  console.log(ex)
});


var db = mongoose.connection;

var port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet({crossOriginResourcePolicy : false}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(useragent.express());

app.use((req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl)
    next();
})

app.use(userRoute)

// const options = {
//   hostname: 'endlessmedicalapi1.p.rapidapi.com',
//   path: '/UpdateFeature?name=SBP&value=115&SessionID=CrhZ4RYP2b0jkKNI',
//   method: 'POST',
//   headers: {
//     'content-type': 'application/octet-stream',
//     'X-RapidAPI-Key': 'adb00715bcmsh341a70cafa48f00p1dc73djsn36bc1fd68f4c',
//     'X-RapidAPI-Host': 'endlessmedicalapi1.p.rapidapi.com'
//   }
// };

// const req = https.request(options, (res) => {
//   console.log(`statusCode: ${res.statusCode}`);

//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
// });

// req.on('error', (error) => {
//   console.error(error);
// });

// req.end();

app.use(express.static(__dirname + '/public'));



const server = app.listen(port, function () {
    console.log("Running Server on port " + port);
});
