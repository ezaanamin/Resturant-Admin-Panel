import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    name: String,
 
    img:String,
    cat:String,
    price:Number,
    cost_price:Number,
    rating:Number,
    total_sales:Number,
    customer_id:Number,
    profit:Number


    

  },
  { timestamps: true }
);

const Product = mongoose.model("Product",  ProductsSchema);
export default Product;
