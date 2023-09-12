const express = require('express');

const User = require('../models/user');


const router = express.Router();


// import bycript 
const bcrypt = require('bcrypt');

// impoort JWT 
const jwt = require('jsonwebtoken');

// ********* User CRUD **********

// create Api for register USER with crypte password 
router.post('/register', async (req, res)=> {
    
    data = req.body;
    usr = new User(data);

    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync(data.password, salt)

    usr.password = cryptedPass;
    usr.save()
    .then((saved)=> {
        res.status(200).send(saved);
    })
    .catch((error)=>  {
        res.status(400).send(error);
        });
});


// API Login with JSON WEB TOKEN (JWT)
router.post('/login', async (req, res)=> {

    data = req.body;
    usr = await User.findOne({email: data.email});

    if(!usr){
        res.status(404).send(" email or password invalid ");
    }else{
        validPass = bcrypt.compareSync(data.password, usr.password);
        if (!validPass ){
            res.status(401).send("email or password invalid ");
        }else{
            // generate token
            /// generate pyload 
            payload={
                _id : usr._id ,
                email : usr.email,
                name : usr.name
            }
            // sign has two params => payload and secret key "1234567"
            token = jwt.sign(payload, "1234567");
            res.status(200).send({mytoken : token});
        }
    }
}) ;



// create API post methode 1 
router.post("/add", (req, res)=> {
    data = req.body;
 
    usr = new User(data);
    usr.save().then(
       (savedUser) => {
          res.status(200).send(savedUser);
       }
    ).catch((err)=>{
       res.status(400).send(err);
    });
 
 });
 
 // create API post methode 2  With Async await 
 router.post('/create',async (req, res)=>{
    try{
       data = req.body;
       usr = new User(data);
 
       savedUser = await usr.save();
 
       res.send(savedUser);
 
 
    }catch (error) {
       res.send(error);
    }
 });
 
 // create API getAll Methode 1
 router.get('/getAll',(req, res)=> {
    User.find()
    .then(
       (users) => {
          res.status(200).send(users);
       })
    .catch (
       (error) => {
          res.status(400).send(error);
       }
    );
 });
 
 // create API getAll with async 
 router.get("/getAllUsers", async (req, res)=>{
    try{
       // add condition 
       //users = await User.find({"age": 26, "name": "oussema"});
       users = await User.find();
       res.send(users);
 
    }catch (error) {
       res.send(error);
    }
 });
 // create API get by id Methode 1  
 router.get("/getbyid/:id", (req, res)=> {
    // read params of path 
    myid = req.params.id;
    
    //User.findById(myid)
    //OR 
    User.findOne({_id: myid})
    .then(
       (user)=>{
          res.send(user);
       }
    )
    .catch(
       (err)=>{
          res.send(err);
       }
    );
 });
 
 // create API get by id with async 
 router.get('/findbyid/:id', async (req, res)=> {
    try {
       myid = req.params.id;
 
       user = await User.findById(myid);
       res.send(user);
    } catch (error) {
       res.send(error);
    }
 
 })
 // create API delete by id Methode 1  
 router.delete("/delete/:id", (req, res)=>{
    myid = req.params.id;
    User.findByIdAndDelete(myid)
    .then((data)=>{
       res.send(data);
    })
    .catch((error)=>{
       res.send(error);
    });
 });
 
 // create API delete by id with async
 router.delete('/deletebyid/:id', async (req, res)=> {
    try {
       myid = req.params.id;
       userdeleted = await User.findByIdAndDelete(myid);
       res.send(userdeleted)
    } catch (error) {
       res.send(error);
    }
    
 });
 
 // create API update id Methode 1
 router.put("/update/:id", (req, res)=>{
    id = req.params.id;
    data = req.body;
    User.findByIdAndUpdate(id,data)
    .then((updated)=>{
       res.send(updated);
    })
    .catch((error)=>{
       res.send(error);
    });
 });
 
 // create API update id with async
 router.put('/updatebyid/:id', async (req, res)=> {
    try {
       id = req.params.id;
       data = req.body;
       updatedUser=await User.findByIdAndUpdate({_id:id},data);
       res.send(updatedUser);
    } catch (error) {
       res.send(error);
    }
 })

module.exports = router;