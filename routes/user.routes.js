const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// registration
userRouter.post("/register", async (req, res) => {
  // console.log(req.body)
  const { name, email, gender, password, age, city, is_married } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
        is_married,
      });
      await user.save();
      res.status(200).send({ msg: "Registration has been done!" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await UserModel.find({ email });
    console.log(user);
    if (user) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login successfull!",
            token: jwt.sign({ userID: user[0]._id }, "shhhhh"),
          });
        } else {
          res.status(400).send({ msg: "Login Failed! Wrong Credentials!" });
        }
      });
    } else {
      res.status(400).send({ msg: "Error" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { userRouter };

// {
//     "name": "Papri",
//     "email": "papri@gmail.com",
//     "gender": "female",
//     "password": "papri@gmail.com",
//     "age": 24,
//     "city": "Bolpur",
//     "is_married": false
//  }

// {
//     "email": "papri@gmail.com",
//     "password": "papri@gmail.com"
//   }