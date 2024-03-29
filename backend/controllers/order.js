import Product from "../model/products.js";
import Orders from "../model/orders.js";
import multer from "multer"
import fs from "fs"
import express from "express"
import Customer from "../model/customers.js";
import Rider from "../model/rider.js";
export function getValue(){

return 2

}

export const PostProduct = async (req, res) => {
 console.log(req.body)
        var newItem = {
           name: req.body.name,
           cat:req.body.cat,
         img: req.body.img,
         price:req.body.price,
         rating:0,
         total_sales:0,
         cost_price:req.body.cost_price,
         customer_id:0

        }; 
        
        console.log(newItem)
        Product.create(newItem, function(err, res1) {
          if (err){
            res.status(404).json(err);
          }
          else
          {
          
          res.status(200).json("Sucessful");
          }
        })
      }

    


    
       

        
      
    


export const GetProductStarters= async (req, res) => {




Product.find({cat:"Starters"}).then(function(doc) {


    if(!doc)
    {
      res.send("Unsucessful")   
    }
    else
    {
     

      
       res.json(doc)
    }


  })

}
export const GetProductBreakfast= async (req, res) => {




  Product.find({cat:"Breakfast"}).then(function(doc) {
  
  
      if(!doc)
      {
        res.send("Unsucessful")   
      }
      else
      {
       
  
        
         res.json(doc)
      }
  
  
    })
  
  }

  export const GetProductLunch= async (req, res) => {




    Product.find({cat:"Lunch"}).then(function(doc) {
    
    
        if(!doc)
        {
          res.send("Unsucessful")   
        }
        else
        {
         
    
          
           res.json(doc)
        }
    
    
      })
    
    }

    export const GetProductDinner= async (req, res) => {




      Product.find({cat:"Dinner"}).then(function(doc) {
      
      
          if(!doc)
          {
            res.send("Unsucessful")   
          }
          else
          {
           
      
            
             res.json(doc)
          }
      
      
        })
      
      }

      export const GetProductDessert= async (req, res) => {




        Product.find({cat:"Dessert"}).then(function(doc) {
        
        
            if(!doc)
            {
              res.send("Unsucessful")   
            }
            else
            {
             
        
              
               res.json(doc)
            }
        
        
          })
        
        }

        export const GetProductBeverage= async (req, res) => {




          Product.find({cat:"Beverage"}).then(function(doc) {
          
          
              if(!doc)
              {
                res.send("Unsucessful")   
              }
              else
              {
               
          
                
                 res.json(doc)
              }
          
          
            })
          
          }
          
export const GetOrderDetails= async (req, res) => {



         Product.findById('63c43e40e42151179f3a685f').then((function(docs){
             if(docs)
             {
              console.log(docs)
             }
  
         }))
    






  Orders.aggregate( [
    {
      $lookup:
        {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customers"
        },
       
   }
 ] ).then(function(doc) {
    if(doc)
    {
       res.json(doc)
    }
    else
    {
        res.json("Error")
    }

 })






}
export const GetOrderProductDetails= async (req, res) => {

  // Orders.aggregate([
  //   {
  //     $lookup: {
  //       from: "products",
  //       localField: "orders",
  //       foreignField: "_id",
  //       as: "products"
  //     }
  //   }
  // ]).then(function(docs) {
  //   if (docs.length > 0) {
  //     res.json(docs); // Sending the array of documents
  //   } else {
  //     res.json("No matching documents found");
  //   }
  // }).catch(function(error) {
  //   res.status(500).json({ error: error.message });
  // });
  
  Orders.find({})
    .populate('orders')
    .exec((err, orders) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(orders);
    });

  

}
export const GetOrderID= async (req, res)=>{ 
  const Id = req.params.id;

  Product.findById(Id).then((function(docs){
    if(docs)
    {
     res.json(docs)
    }

}))
}
export const EditOrder=async (req,res)=>{
 const Id = req.params.id;
 var myquery = { _id: Id };
var val=0
   var newvalues ={ $set:{
           name: req.body.name,
          cat:req.body.cat,
         img: req.body.img,
         price:req.body.cost_price,
         cost_price:req.body.price,
      

        }
      }
    Product.updateOne(myquery, newvalues, function(err, res1) {

        if (err)
        {
        res.send("error")
        }
        else
        {
         res.send("sucessful")
        }
       
      });

}

export const DeleteOrder=async (req,res)=>{

  const Id = req.params.id;
  var myquery = { _id: Id };


  Product.deleteOne(myquery, function(err, obj) {
    if (err)
    {
      res.send(err)
    }
   
  else
  {
    res.send("Sucess")
  }


  })
}
export const OrdersAndRider=async (req,res)=>{


  Orders.aggregate( [
    {
      $lookup:
        {
          from: "riders",
          localField: "all_riders",
          foreignField: "_id",
          as: "all_riders"
        },
        
     
    
       
   }
  ] ).then(function(doc) {
    if(doc)
    {
      
      res.json(doc)
    }
    else
    {
        res.json("Error")
    }
  
  })




}

export const OrdersDetailAndRider=async (req,res)=>{
  Orders.find({ status: 'assigned' })
  .populate('orders') // Populates the orders array with Product documents
  .populate('rider') // Populates the rider field with Rider document
  .exec((err, orders) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred", error: err });
      return;
    }
    // Check if there are any orders found
    if (orders && orders.length > 0) {
      console.log(orders); // If needed for debugging
      res.json(orders); // Sends the orders in the response
    } else {
      // If no orders are found or none have the 'assigned' status, send an appropriate response
      res.status(404).json({ message: "No assigned orders found" });
    }
  });


}

export const RouteOrdersDetailAndRider=async (req,res)=>{


  Orders.find({ status: 'On Route' })
  .populate('orders') // Populates the orders array with Product documents
  .populate('rider') // Populates the rider field with Rider document
  .exec((err, orders) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred", error: err });
      return;
    }
    // Check if there are any orders found
    if (orders && orders.length > 0) {
      console.log(orders); // If needed for debugging
      res.json(orders); // Sends the orders in the response
    } else {
      // If no orders are found or none have the 'assigned' status, send an appropriate response
      res.status(404).json({ message: "No assigned orders found" });
    }
  });


}