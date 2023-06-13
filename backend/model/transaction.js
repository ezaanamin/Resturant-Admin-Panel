import mongoose from "mongoose";
const TransactionSchema = new mongoose.Schema(
  {

  transaction_type:String,
    Order_Number:Number,
    Date:Date,
    order_id:Number,
    customer_id:mongoose.Schema.Types.ObjectId,
    status:String,
    total_amount:Number,




   

  },
  { timestamps: true }
);

const transaction = mongoose.model("Transaction",TransactionSchema);

export default  transaction