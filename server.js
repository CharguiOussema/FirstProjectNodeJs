// import express
const express = require('express');

const productRoute = require('./routes/product');
const userRoute = require('./routes/user');

// import  connect.js file 
require('./config/connect');

const app = express();

// alow my app to accept data .json 
app.use(express.json());


// declaration of route 
app.use('/product', productRoute);
app.use('/user', userRoute);

// api for geting file by name  exemple 
//http://127.0.0.1:3000/getimage/1694481137774.png
app.use('/getimage', express.static('./uploads'));


app.listen(3000,()=>{
   console.log("server work");
});
