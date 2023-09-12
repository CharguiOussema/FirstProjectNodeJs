const express = require('express');

const Product = require('../models/product');

const router = express.Router();


 // *********** Upload File ********** 
filename = "";


// import multer pour upload un fichier 
const multer = require('multer');
// comme une déclaration de multer 
const mystorage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, redirect) => {
    let date = Date.now();
    // mimetype.split('/')[1] => return the extension of file 
    let fl = date + "." + file.mimetype.split('/')[1];    
    redirect(null, fl);
    filename = fl;
    }
})


const upload = multer({storage: mystorage});



// ********* Product CRUD **********

//creat product and upload image 


router.post('/createproduct', upload.any('image'), async (req, res)=>{
    try{
       data = req.body;
       product = new Product(data);
       product.image = filename;
       savedProduct = await product.save();
       // rinitialise file name empty 
       filename="";
       res.status(200).send(savedProduct);
 
 
    }catch (error) {
       res.status(400).send(error);
    }
 });
 
 router.get("/getAllProduct", async (req, res)=>{
    try{
       
       prods = await Product.find();
       res.status(200).send(prods);
 
    }catch (error) {
       res.status(400).send(error);
    }
 });
 
 
 router.get('/findbyidProduct/:id', async (req, res)=> {
    try {
       myid = req.params.id;
 
       prod = await Product.findById(myid);
       res.status(200).send(prod);
    } catch (error) {
       res.status(400).send(error);
    }
 
 })
 
 
 router.delete('/deleteProduct/:id', async (req, res)=> {
    try {
       myid = req.params.id;
       proddeleted = await Product.findByIdAndDelete(myid);
       res.status(200).send(proddeleted)
    } catch (error) {
       res.status(400).send(error);
    }
    
 });
 
 
 router.put('/updatebyidProduct/:id', async (req, res)=> {
    try {
       id = req.params.id;
       data = req.body;
       updatedprod=await Product.findByIdAndUpdate({_id:id},data);
       res.status(200).send(updatedprod);
       
    } catch (error) {
       res.status(400).send(error);
    }
 })


module.exports = router;