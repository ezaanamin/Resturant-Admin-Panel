import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
   order_id:Number,
   Orders:Number,
   customer_id:Number,
   orders:{
    type:mongoose.Schema.Types.ObjectId,
  },
 status:String,
 rider:mongoose.Schema.Types.ObjectId,
 
  


    

  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders",  OrdersSchema);
export default Orders
