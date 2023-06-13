import express from "express"
import {DeleteOrder, EditOrder, GetOrderID, OrdersDetailAndRider, PostProduct, RouteOrdersDetailAndRider} from "../controllers/order.js"
import {GetProductStarters} from "../controllers/order.js"
import { GetProductBreakfast} from "../controllers/order.js"
import {GetProductLunch} from "../controllers/order.js"
import {GetProductDinner} from "../controllers/order.js"
import { GetProductDessert} from "../controllers/order.js"
import {GetProductBeverage} from "../controllers/order.js"
import {GetOrderDetails} from "../controllers/order.js"
import {GetOrderProductDetails} from "../controllers/order.js"
import { OrdersAndRider } from "../controllers/order.js"
import multer from "multer"
const router=express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/home/ezaan-amin/Documents/Programming/Profolio/Resturant/Admin Panel/backend/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), function (req, res) {

  const file = req.file;
 
  res.status(200).json(file.filename);
});
router.post("/",PostProduct)
router.get("/get/starters",GetProductStarters)
router.get("/get/breakfast",GetProductBreakfast)
router.get("/get/lunch",GetProductLunch)
router.get("/get/dinner",GetProductDinner)
router.get("/get/dessert", GetProductDessert)
router.get("/get/beverage",GetProductBeverage)
router.get("/get/orders",GetOrderDetails);
router.get("/get/orders/product",GetOrderProductDetails);
router.get('/get/orders/:id',GetOrderID)
router.post('/edit/order/:id',EditOrder)
router.delete('/delete/order/:id',DeleteOrder)
router.get('/riders/orders',OrdersAndRider)
router.get('/riders/orders/details',OrdersDetailAndRider)
router.get('/riders/routes/orders',RouteOrdersDetailAndRider)
export default router;