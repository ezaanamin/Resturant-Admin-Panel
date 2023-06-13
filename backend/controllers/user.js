import express from "express"
import User from "../model/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

async function comparePassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
}
export const getUser = async (req, res) => {

    const client = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
      
    })   
    console.log(req.body)
    if(client)
    {
User.findOne({name:req.body.username}) .then(function(doc) {
    if(!doc)
    {
        
        res.send("Wrong username")
        
    }
    else
    {
      let p=req.body
      console.log(doc.password)

      console.log(p)
 
      comparePassword(req.body.password, doc.password)
      .then((result) => {
        if (result) {
          let name=doc.name
          const token = jwt.sign(
            { user_id: doc._id,name },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          res.json({"token":token,name:name,professional:"Amin Restaurant"})
        } else {
     res.send("Wrong password")
        }
      })
      .catch((error) => {
        console.error('Error comparing passwords:', error);
      });
 
  
      
   
      

    }


 
})
    }




}