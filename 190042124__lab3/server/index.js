const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({extended:true}))



const db = mysql.createPool({

  host: "localhost",
  user: "root",
  password: 'root',
  database : 'cruddatabase'

})




app.get("/bookList",(req,res)=>{


  const sqlGet = "SELECT * FROM library ";

  db.query(sqlGet,(err,result)=>{
    console.log(result);
    res.send(result);

  });


});


app.post("/insert",(req,res)=>{

  const name = req.body.name
  const author = req.body.author
  const genre = req.body.genre

  const sqlInsert = "INSERT INTO library (name,author,genre) VALUES (?,?,?)"
  db.query(sqlInsert,[name,author,genre],(err,result)=>{
    console.log(err)
  })

})

app.delete("/delete/:id",(req,res)=>{

  //const name = req.params.name
  const {id} = req.params;
 
  const sqlDelete = "DELETE FROM library WHERE id = ?"

  db.query(sqlDelete,id,(err,result)=>{

    if(err){
    console.log(err)
    }
  })

})

app.get("/bookList/:id",(req,res)=>{

    const {id} = req.params;
    
    console.log(req.params)
    const sqlGet = "SELECT * FROM library WHERE id= ?";
  
    db.query(sqlGet,id,(err,result)=>{
      console.log(result);
      res.send(result);
  
    });
  
  
  });

  app.put("/put/:id",(req,res)=>{

    const {id} = req.params;
    console.log(req.params)
    const {name, author, genre} = req.body;
    const sqlUpdate = "UPDATE library SET name= ?, author= ?, genre = ? WHERE id = ?";
  
    db.query(sqlUpdate,[name, author, genre, id],(err,result)=>{
      console.log(result);
      res.send(result);
  
    });
  
  
  });



app.listen(3001,()=>{

  console.log("App listening to port : 3001")

})