const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./userDetails");

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(cookieParser());

//mongodb connection code
const mongoUrl =
  "mongodb+srv://sutharkalpesh101:PoodlesPetcare@database.krproer.mongodb.net/?retryWrites=true&w=majority&appName=DataBase";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

//custom api
app.listen(4000, () => {
  console.log("Server Started");
});

/* app.post("/post", async (req, res) => {
  console.log(req.body);
}); */

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ name, email, password: hash })
        .then((user) => res.json({ status: "OK" }))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});


//login page api
app.post('/login', (req, res) => {
  const {email, password} = req.body;
  UserModel.findOne({email: email})
  .then(user => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign({email: user.email, role:user.role},
            "kalpesh", {expiresIn: '1d'})
            res.cookie('token', token)
            return res.json({status: "Ok", role: user.role})
        } else {
          return res.json("the password is incorrect")
        }
      })
    }else{
      return res.json("No record existed")
    }
  })
})

const varifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("token is missing")
  }else{
    jwt.json(token, "kalpesh", (err, decoded) => {
      if (err) {
        return res.json("Errors with token")
      }else{
        if (decoded.role === "admin") {
          next()
        }else{
          return res.json("not admin")
        }
      }
    })
  }
}

app.get('/dashboard', varifyUser, (req, res) => {
  res.json("Succes")
})