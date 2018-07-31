const express=require('express');
const hbs=require('hbs');
const port=process.env.PORT || 3000;


 let app= express();

 app.set('view engine','hbs');

 app.get('/',(req,res)=>{
 res.render('home.hbs');
 });

 app.get('/2.hbs',(req,res)=>{
 	 res.render('2.hbs',{
	 first_name:req.query.first_name,
	 last_name:req.query.last_name,
	 email:req.query.email
	 });
	 
 });

 app.listen(port,()=>{
 console.log(`Server is at open at port ${port}`);
 });