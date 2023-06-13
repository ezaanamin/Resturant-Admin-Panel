import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    name:String,
    address:String,
    phone:Number,
    email:String,

   


   

  },
  { timestamps: true }
);

const About = mongoose.model("About",AboutSchema);

export default About