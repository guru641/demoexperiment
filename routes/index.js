var express = require('express')
var app = express()
var session = require('express-session');
const db=require('../connection/database').db;
//var model = require('nodejs-model');
app.set('view engine', 'ejs');

console.log('==gg=======',db);
// db.query('select * from usersdata',(err,data)=>{
//   console.log('===========',err)
//   console.log('===========',data);
// })
// let a;
function a(cb){

  var username=session.username;
  var password=session.password;
 return db.query(`select * from usersdata` ,(err,data)=>{
    console.log('===========',err)
     console.log('===========',data);
  cb(err,data);
  })
}
a((err,data)=>{
console.log('==========',err,data);
});


app.listen(4000,function(){
    console.log('Server listing on 4000');

    console.log('hello welcomee');
})



app.get('/index', function (req, res) {
  res.render('index.ejs', {data:'guruprasad'})
})


app.get('/signup', function (req, res) {
  res.render('signup.ejs')
})

app.get('/logout', function (req, res) {
  res.render('login.ejs', {data:''})
})


app.get('/justinsert', function (req, res) {
    
  
  
  function a(cb){
  
    var uname=req.query.uname;
    var pword=req.query.pword;
    var emailid=req.query.email_id;
    var phoneno=req.query.phoneno;
    var address=req.query.address;
    var userid=req.query.userid;

  console.log(emailid);
   return db.query(`insert into usersdata values(${userid},'${uname}','${pword}',${phoneno},'${emailid}','${address}')` ,(err,data1)=>{
      
    cb(err,data1);
    })
  }
  
  
  a((err,data1)=>{
  
      res.render('login.ejs',{data:"data is inserted you can login now"}); 
    });


})



app.get('/check', function (req, res) {

console.log(req.query.uname)
console.log(req.query.pword)



function a(cb){

  var uname=req.query.uname;
  var pword=req.query.pword;

 return db.query(`select * from usersdata where user_name='${uname}' and password='${pword}'` ,(err,data1)=>{
    
  cb(err,data1);
  })
}


a((err,data1)=>{

if(data1.length>0){
  if(req.query.uname==data1[0].user_name && req.query.pword==data1[0].password)
  {
    res.render('check.ejs', {username:req.query.uname,password:req.query.pword,userid:data1[0].user_id,emailid:data1[0].email_id,phoneno:data1[0].phone_no,address:data1[0].address})
  }

  else
  {
      // alert("invalid user name or password")
    res.render('login.ejs',{data:'user name or password are incorrect'});

  }
}else{
  res.render('login.ejs',{data:'user name or password are incorrect'});  
}
  


  
  });
 
 
})


app.get('/login', function (req, res) {
  res.render('login.ejs', {data:''})
})

app.get('/experiment', function (req, res) {
  res.render('experiment.ejs', {data1:''})
}) 


// console.log('=============')