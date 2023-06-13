import mongoose from "mongoose";
const PendingOrderSchema = new mongoose.Schema(
  {
    order_id:Number,
    riders:mongoose.Schema.Types.ObjectId,
  customer_id:mongoose.Schema.Types.ObjectId,

   

  },
  { timestamps: true }
);

const PendingOrder = mongoose.model("Pending Order",PendingOrderSchema);

export default PendingOrder