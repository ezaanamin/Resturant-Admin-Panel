import mongoose from "mongoose";

const RiderSchema = new mongoose.Schema(
  {
    name:String,
    email:String,
    phone:Number,
    password:String,
    all_orders:[
     Number

    ],
    delivered_order:[
      Number

    ],
    assigned_order:[
      Number,

    ],
    
    rating:Number,
    current_order:[
      Number
    ],
    rejected_order:[
      Number
    ],
    




   

  },
  { timestamps: true }
);

const Rider = mongoose.model("Rider",RiderSchema);

export default Rider