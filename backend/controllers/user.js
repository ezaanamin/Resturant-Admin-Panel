import express from "express"
import User from "../model/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

async function comparePassword(password, hashedPassword) {
 
  const client = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    
  })  
}
export const getUser = async (req, res) => {
  try {
    const client = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
      
    })  
 
    console.log(req.body);
    if(client)
    {
    const doc = await User.findOne({ name: req.body.username });

    if (!doc) {
      return res.send("Wrong username");
    }

    const match = await bcrypt.compare(req.body.password, doc.password);
console.log(match)
    if (match) {
      const token = jwt.sign(
        { user_id: doc._id, name: doc.name },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      return res.json({ token: token, name: doc.name, professional: "Amin Restaurant" });
    } else {
      return res.json({error:"error"});
    }
  }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send("Internal Server Error");
  } 
};

 
  
  

async function hashPassword(password) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password along with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
     return hashedPassword
  } catch (error) {
    // Handle error
    console.error('Error hashing password:', error);
    throw error;
  }
}