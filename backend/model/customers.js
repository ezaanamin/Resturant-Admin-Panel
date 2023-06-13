import mongoose from "mongoose";
import Product from "./products.js"
const CustomersSchema = new mongoose.Schema(
  {
    name:String,
    email:String,
    phone:Number,
    password:String,
    googleId:String,
    orders:[Number]


   

  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer",CustomersSchema);

export default Customer