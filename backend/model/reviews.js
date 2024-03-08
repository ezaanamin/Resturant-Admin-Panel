import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema(
  {
    name:String,
    review:String,
    img:String
    


   

  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews",ReviewsSchema);

export default Reviews