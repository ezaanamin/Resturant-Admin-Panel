import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema(
  {

  transaction_type:String,
    Order_Number:Number,
    date:Date,
    order_id:Number,
    total_amount:Number,




   

  },
  { timestamps: true }
);

const transaction = mongoose.model("Transaction",TransactionSchema);

export default  transaction