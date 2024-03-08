import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
  {
   order_id:Number,
      customer_id:{
        type:mongoose.Schema.Types.ObjectId,
      },
      orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Reference to Product collection
      }],
 status:String,
 rider: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Rider' // assuming you have a Rider model
},
 
  


    

  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders",  OrdersSchema);
export default Orders
