import Rider from "../model/rider.js"
import Orders from "../model/orders.js"

export const GetRiders= async (req, res) => {


    Rider.find({}).then(function(doc) {


        if(!doc)
        {
          res.send("Unsucessful")   
        }
        else
        {
         
    
          
           res.json(doc)
        }
    
    
      })
    

  //   Orders.updateMany(
  //     { },
  //     { $set: { status: "Pending" } }
  //  ).then(function(doc) {
  //   if(doc)
  //   {
  //     res.json(doc)
  //   }


  //  })

}

export const AddRiders=async (req,res)=>{


  console.log(req.body)

  let name=req.body.name
  let email=req.body.email
  let rating=0

  let newItem={

    name:name,
    email:email,
    rating:rating,
    password:"$2y$10$jjsuak8aFo1eiOwXv63r6OZkrAwM3zmwVTiZguiyIcHQANQHl8LIO"




  }

  Rider.findOne({email:req.body.email}).then((doc)=>{

if(doc)
{
  res.send("User Exists")
}
else
{

  Rider.create(newItem).then((err)=>{


    if(err)
    {
      console.log("sucessful")
    }
    else
    {
      console.log("error")
    }



  })

  
}

  })


}

export const QueueOrders= async (req, res) => {

const riderId=req.body.rider_id
const order_id=req.body.order_id

//console.log(riderId)
const update = { $push: { assigned_order: order_id } }; 

Rider.findByIdAndUpdate(riderId,update).then((doc)=>{



//console.log(doc.pending_order)
const updateField = { };



Orders.findOneAndUpdate({order_id:order_id}, {$set:{rider:riderId,status:"assigned" }}, {new: true}, (err, doc) => {
  if (err) {
      res.send("Something wrong when updating data!");
  }

  res.send("sucessful")
});
})




}