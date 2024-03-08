import  express  from "express";
import  {GetSales}  from "../controllers/sales.js";

const router=express.Router();

router.get("/sales",GetSales)


export default router