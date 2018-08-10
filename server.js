const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

let app= express();

 app.set('view engine','hbs');


const port=process.env.PORT || 3000;

let fetchData=()=>{
try{
let detString=fs.readFileSync('data.json');
return JSON.parse(detString);
}catch(e){
return [];
}
};

let saveData=(detData)=>{
fs.writeFileSync('data.json',JSON.stringify(detData));
};


 

 app.get('/',(req,res)=>{
 res.render('home.hbs');
 
 });

 app.get('/2',(req,res)=>{
 	 res.render('2.hbs',{
	 first_name:req.query.first_name,
	 last_name:req.query.last_name,
	 email:req.query.email
	 });
	 
	  let det={first_name:req.query.first_name,
			last_name:req.query.last_name,
			email:req.query.email
			};
			let detData=fetchData();
			detData.push(det);
			saveData(detData);

 });

 app.get('/users',(req,res)=>{
 let users=JSON.stringify(fetchData());



 
  res.render('users.hbs',{
  users
  });
  });

  app.get('/update',(req,res)=>{
  let users=JSON.stringify(fetchData());
 
  	  res.render('update.hbs',{
	 users
	 });
	
  });
  
  app.get('/newdetails',(req,res)=>{
  let toEditEmail=req.query.email_edit;
  
  let users=fetchData();
  

let editedUsers=[];

for(let i=0;i<users.length;i++){
	if(toEditEmail!==users[i].email){
	 let abc={
	  	  firstName:users[i].first_name,
		  lastName:users[i].last_name,
		  email:users[i].email
		  };
		  editedUsers.push(abc);
		  }
		  
		
	
}
saveData(editedUsers);

 
  res.render('newdetails.hbs');
  });

 app.listen(port,()=>{
 console.log(`Server is open at port ${port}`);
 });



