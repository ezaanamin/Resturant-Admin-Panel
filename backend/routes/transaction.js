import express from "express"
import {GetTransaction} from "../controllers/transaction.js"
const router=express.Router();
router.get("/",GetTransaction)



export default router;