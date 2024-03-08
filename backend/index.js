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
import About from "./model/About.js"
// import { dataOverallStat } from "./overallStats.js"
// import OverallStat from "./model/OverallStats.js"
import GeneralRoutes from "./routes/general.js"
import { Sales } from "./model/sales.js"
import Rider from "./model/rider.js"
import SalesRoutes from "./routes/sales.js"
import RIderRoutes from "./routes/riders.js"
import {data} from "./data.js"
import { Server } from "socket.io"
import http from "http"
// import {sampleData} from "./transactiondata.js"
import Reviews from "./model/reviews.js"
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


const reviewsToInsert = [
  {
    name: "Bill Gates",
    review: "As a tech enthusiast and a lover of fine cuisine, I must say Amin Restaurant exceeded all my expectations! From the moment I walked in, I was greeted with warmth and hospitality. The ambiance was delightful, and the aroma of freshly cooked food tantalized my senses. The menu offered a diverse range of dishes, each more delicious than the last. The service was impeccable, and the staff went above and beyond to ensure my dining experience was nothing short of exceptional. I highly recommend Amin Restaurant to anyone looking for an unforgettable culinary journey.",
    img: "Bill_Gates.jpg"
  },
  {
    name: "Imran Khan",
    review: "Amin Restaurant is a hidden gem in the heart of the city! From the moment I stepped through the doors, I was transported to a culinary paradise. The decor was elegant, and the atmosphere was buzzing with excitement. The menu boasted a wide selection of mouth-watering dishes, each bursting with flavor. I had the pleasure of trying several dishes, and each one was a culinary masterpiece. The staff were attentive and friendly, ensuring that every aspect of my dining experience was perfect. Amin Restaurant has definitely earned a permanent spot on my list of favorite eateries!",
    img: "Imarn_Khan.jpg"
  },
  {
    name: "Sheldon Cooper",
    review: "As a connoisseur of all things gastronomic, I must say Amin Restaurant is a triumph of culinary excellence! From the moment I entered, I was greeted with a symphony of tantalizing aromas and an ambiance that can only be described as celestial. The menu, a veritable cornucopia of gastronomic delights, left me spoiled for choice. I sampled a variety of dishes, each a harmonious blend of flavors and textures that danced upon my palate. The service was impeccable, with the staff displaying a level of attentiveness and professionalism that is truly commendable. Amin Restaurant is, without a doubt, a culinary utopia that I wholeheartedly recommend to fellow epicureans!",
    img: "sheldon cooper.jpeg"
  },
  {
    name: "Elon Musk",
    review: "Amin Restaurant is truly out of this world! From the moment I set foot inside, I was transported to a realm of gastronomic delights unlike any other. The ambiance was electric, and the menu offered a tantalizing array of dishes that catered to every palate. I had the pleasure of sampling several dishes, each one a testament to the culinary expertise of the chefs. The service was exceptional, with the staff demonstrating a keen attention to detail and a genuine passion for hospitality. Amin Restaurant is a must-visit for anyone seeking an extraordinary dining experience!",
    img: "Elon_Musk.jpg"
  },
  {
    name: "Robert Downey Jr.",
    review: "Amin Restaurant is not just a dining establishment; it's an experience. From the moment you walk through the doors, you're greeted with an atmosphere that's both inviting and sophisticated. The menu is a culinary journey through flavors and textures that will leave your taste buds tingling with delight. The staff are attentive and knowledgeable, ensuring that every aspect of your dining experience is perfect. Whether you're looking for a casual meal or a special occasion, Amin Restaurant delivers on all fronts. I highly recommend it to anyone looking for a memorable dining experience.",
    img: "Robert Downey Jr.jpeg"
  },
];

const changeStream=Orders.watch()
// Reviews.insertMany(reviewsToInsert)
//   .then((result) => {
//     console.log("Reviews inserted successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error inserting reviews:", error);
//   });

// transaction.insertMany(sampleData);

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


 
  



   

  
  


