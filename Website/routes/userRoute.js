const { json } = require("body-parser");
const express=require("express");
const bcrypt= require('bcryptjs');
const jwt=require("jsonwebtoken");
const { compare } = require("bcrypt");
const Message = require('../models/message');
// const adminAuth = require("../Middleware/adminAuth");
// const userAuth = require("../Middleware/userAuth");
// const juices=require('../data/juices')
// const smoothies=require('../data/smoothies');
// const s_banner = require("../data/s_banner");
// const j_banner = require("../data/j_banner");
let app=express();
app.use(express.static('public'));


app.get('/', async function(req, res) {
    try{
      // res.render('home', {
      // product: juices,
      // banner:j_banner
      // })}
      res.render('home')}
      catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving posts");
      }
    });


app.get('/chat', async (req, res) => {
  try {
    const messages = "true"
    // await Message.find().sort({ createdAt: 'desc' });
    res.render('chat', { messages });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/chat', async (req, res) => {
  try {
    const message = new Message({
      sender: 'user',
      text: req.body.message
    });
    await message.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get("/signup", async function(req, res){
   
  try{
    res.render('signup')}
  catch (error) {
      console.log(error);
      res.status(500).send("Error retrieving posts");
    }
});

  
app.post("/signup",async(req,res)=>{
  var {Role,Username,Name,Password,Phone,Email}=req.body;


  if(Username==undefined||null||typeof(Username)!=="string"){
      res.status(200).json({
          status:false,
          data:"Error Occured at User Name"
      })
      return;
  }
  var existName= await userModel.findOne({userName:Username})
  if (existName !== null || undefined){
      res.status(200).json({
          status:false,
          msg:"Username already exists"
      })
      return;
  }
  if(Name==undefined||null||typeof(Name)!=="string"){
      res.status(200).json({
          status:false,
          data:"Error Occured at Name"
      })
      return;
  }
  if(Password==undefined||null||typeof(Password)!=="string"){
      res.status(200).json({
          status:false,
          data:"Error Occured at Password"
      })
      return;
  }
  if(Phone==undefined||null||typeof(Phone)!=="number"){
      res.status(200).json({
          status:false,
          data:"Error Occured at Phone"
      })
      return;
  }
  var alreadyExists= await userModel.findOne({phone:Phone})
  if (alreadyExists !== null || undefined){
      res.status(200).json({
          status:false,
          msg:"Phone already registered"
      })
      return;
  }
  if(Email==undefined||null||typeof(Email)!=="string"){
      res.status(200).json({
          status:false,
          data:"Error Occured at Email"
      })
      return;
  }

  if (password !== confirm_password) {
      return res.status(400).send("Passwords do not match");
    }
  
    // Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);


  const userData= new userModel();
  userData.role=Role;
  userData.userName=Username;
  userData.Name=Name;
  userData.password=encryptedPass;
  userData.phone=Phone;
  userData.email=Email;
  await userData.save();

  // var allData=await userData.find({});

  if(res.status(200)){
      res.render('login_success')
  }

});

app.get("/login", async function(req, res){
 
  try{
    res.render('login')}
  catch (error) {
      console.log(error);
      res.status(500).send("Error retrieving posts");
    }
});

  module.exports=app;