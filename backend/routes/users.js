import express from "express"
import {getUser} from "../controllers/user.js"
const router=express.Router();
router.post("/",getUser)
export default router;