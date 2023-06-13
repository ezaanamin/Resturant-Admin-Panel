import express from "express"
import {GetCustomers} from "../controllers/customers.js"
import { CalculateTotalAmount} from "../controllers/customers.js"
import { hashPassword} from "../controllers/customers.js"
const router=express.Router();

router.get("/",GetCustomers);
router.get('/price',CalculateTotalAmount);
router.get('/password',hashPassword)


export default router;