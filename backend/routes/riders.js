import express from "express"
import {AddRiders, GetRiders, QueueOrders} from "../controllers/rider.js"
const router=express.Router();

router.get("/",GetRiders)
router.post('/order',QueueOrders);
router.post('/add',AddRiders)

export default router;
