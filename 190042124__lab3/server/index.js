const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const bcrypt = require('bcrypt');
app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({extended:true}))



const db = mysql.createPool({

  host: "localhost",
  user: "root",
  password: 'root',
  database : 'cruddatabase'

});

const createUserTable = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'faculty') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

db.query(createUserTable, (err, result) => {
  if (err) {
    console.log(err);
  }
});

//////

const secretKey = 'yourSecretKey'; // change this to a secure key

function generateToken(user) {
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  return token;
}

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function comparePasswords(password, hash) {
  return bcrypt.compareSync(password, hash);
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';

  db.query(sql, [username], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    if (result.length === 0) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    const user = result[0];

    if (!comparePasswords(password, user.password)) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    const token = generateToken(user);

    res.status(200).send({ token });
  });
});

app.post('/users', (req, res) => {
  const { username, password, role } = req.body;

  const hashedPassword = hashPassword(password);

  const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';

  db.query(sql, [username, hashedPassword, role], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.status(201).send({ message: 'User created' });
  });
});

app.get('/users', (req, res) => {
  const sql = 'SELECT id, username, role FROM users';

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.status(200).send(result);
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  const hashedPassword = hashPassword(password);

  const sql = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';

  db.query(sql, [username, hashedPassword, role, id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.status(200).send({ message: 'User updated' });
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
  if (err) {
  res.status(500).send(err);
  } else {
  res.send(result);
  }
  });
  });


//////


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