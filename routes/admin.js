const{Router}= require("express");
const adminRouter=Router();
const {adminModel}=require("../db")
//bcrypt, zod and jsonwebtoken
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "aladdin12342e2323";

   adminRouter.post("/signup", async function(req, res){
     const { email, password, firstName, lastName } = req.body;
  await adminModel.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  res.json({
    message: "Signup succeeded",
  });
})

adminRouter.post("/signin",async function(req, res){
       const { email, password } = req.body;
  // Ideally password should be hashed, and hence you cant compare the user provided password and the database password
  const admin = await adminModel.findOne({
    email: email,
    password: password,
  });
  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );

    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "incorrect Credentials",
    });
  }

})


   adminRouter.post("/course", function(req, res){
    res.json({message:"siognup endpoint"})
})


adminRouter.put("/course", function(req,res)
{
    res.json({
        message:"signup endpoint"
    })
})
adminRouter.get("/course/bulk", function(req, res)
{
    res.json({message:"Signup endpoint"})
})


module.exports={
    adminRouter:adminRouter
}