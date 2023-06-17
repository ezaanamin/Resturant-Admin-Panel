import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import OrderRoutes from "./routes/orders.js"
import generalRoutes from "./routes/general.js"
import ItemsRoutes from "./routes/items.js"
import CustomersRoutes from "./routes/customers.js"
import UsersRoutes from "./routes/users.js"
import transactionRoutes from "./routes/transaction.js"
import mongoose from "mongoose"
import  bcrypt from "bcrypt"
import Product from "./model/products.js"
import multer from "multer"
import  Customer  from "./model/customers.js"
import transaction from "./model/transaction.js"
import Orders from "./model/orders.js"
import { dataOverallStat } from "./overallStats.js"
import OverallStat from "./model/OverallStats.js"
import GeneralRoutes from "./routes/general.js"
import { Sales } from "./model/sales.js"
import Rider from "./model/rider.js"
import SalesRoutes from "./routes/sales.js"
import RIderRoutes from "./routes/riders.js"
import {data} from "./data.js"
import { Server } from "socket.io"
import http from "http"
dotenv.config();

const app=express()
const server=http.createServer(app)
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/upload',express.static('upload'))
const io=new Server(server,{


  cors:{
      origin:"http://localhost:3001",
      methods:["GET","POST"]
  }
})

io.on("connection",(socket)=>{

  console.log("User Connected",socket.id);


    



socket.on("disconnect",()=>{
console.log("user disconnected",socket.id)

})




const changeStream=Orders.watch()




changeStream.on('change', function(data) {

  Orders.aggregate( [
    {
      $lookup:
        {
          from: "products",
          localField: "orders",
          foreignField: "_id",
          as: "products"
        },
        
 
        
    
       
   }
  ] ).then(function(doc) {
    if(doc)
    {
      
      io.emit('OrderAdd', doc);

    }
    else
    {
      io.emit('OrderAdd', "error");

      
    }
  
  })
})

changeStream.on('change', (data) => {



  if(data.operationType=="insert" && data.fullDocument.status=="Pending")
  {
        io.emit('statusChanged', {id: data.fullDocument.order_id, status:'New Order has been received'});


  }
if(data.operationType!="insert")
  {
//  io.emit(data.updateDescription.updatedFields.status)
Orders.findById(data.documentKey._id).then((doc)=>{


if(doc)
{
  if (data.operationType === 'update' && data.updateDescription.updatedFields.rider == undefined && data.updateDescription.updatedFields.status=="Pending" )
{
  io.emit('statusChanged', { id:doc.order_id, status:"Rejected" });}

  if(data.updateDescription.updatedFields.status=="On Route")
  {
    io.emit('statusChanged', {id:doc.order_id,status:'On the way'});
  }


  if(data.updateDescription.updatedFields.status=="delivered")
  {
    io.emit('statusChanged', {id:doc.order_id,status:'delivered'});
  }
  if(data.updateDescription.updatedFields.rider == undefined && data.updateDescription.updatedFields.status=="Pending" )
  {
    io.emit('statusChanged', {id:doc.order_id,status:'Rejected'});

  }



}


 })

}})

//  console.log(data.updateDescription.updatedFields.status)
//  const updatedFields = data.updateDescription.updatedFields;
//  const myField = updatedFields.myField;
//  console.log(myField)



});


app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(cors())
app.get("/",(req,res)=>{
  res.json("hiii")
})
const currentYear = new Date().getFullYear()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/home/ezaan-amin/Documents/Programming/Profoilo/Resturant/Admin Panel/backend/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  console.log(file)
  res.status(200).json(file.filename);
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use("/order",OrderRoutes);
app.use("/general",generalRoutes);
app.use("/items",ItemsRoutes);
app.use("/customers",CustomersRoutes);
app.use("/users",UsersRoutes)
app.use("/transaction",transactionRoutes )
app.use("/sales",SalesRoutes)
app.use("/riders",RIderRoutes)
app.use('/general',GeneralRoutes)
const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    
  })
  .then(() => {
    // console.log(currentYear)
    // if( currentYear==2023)
    // {

    //   DataBaseSales(currentYear)

    // }


  

   

    // Rider.updateMany(
    //   {}, // Empty filter to update all documents in the collection
    //   { $set: { assigned_order: [] } }
    // ).then((doc)=>{
    //   console.log(doc)
    
    // })    
  
   
    
   console.log("Connected")
   server.listen(PORT, () => console.log(`Server Port: ${PORT}`));

})
  .catch((error) => console.log(`${error} did not connect`));


 
  



   

  
  


