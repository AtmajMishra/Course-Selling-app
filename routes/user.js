const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config")

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  await userModel.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  res.json({
    message: "Signup succeeded",
  });
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  // Ideally password should be hashed, and hence you cant compare the user provided password and the database password
  const user = await userModel.findOne({
    email: email,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );

    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "incorrect Credentials",
    });
  }
});

userRouter.get("/purchases", function (req, res) {
  res.json({ message: "siognup endpoint" });
});

module.exports = {
  userRouter: userRouter,
};
