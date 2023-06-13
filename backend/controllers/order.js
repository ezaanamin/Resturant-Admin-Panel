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
      
      res.json(doc)
    }
    else
    {
        res.json("Error")
    }
  
  })
  
  

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
  Orders.aggregate([
    {
      $match: {
        status:"assigned"
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "orders",
        foreignField: "_id",
        as: "products"
      }
    },
    {
      $lookup: {
        from: "riders",
        localField: "rider",
        foreignField: "_id",
        as: "riders"
      }
    }
  ]).then((doc,err)=>{

    if(doc)
    {
     res.send(doc)
    }
    if(err)
    {
      res.send(err)
    }

  })

}

export const RouteOrdersDetailAndRider=async (req,res)=>{


  Orders.aggregate([
    {
      $match: {
        status:"On Route"
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "orders",
        foreignField: "_id",
        as: "products"
      }
    },
    {
      $lookup: {
        from: "riders",
        localField: "rider",
        foreignField: "_id",
        as: "riders"
      }
    }
  ]).then((doc,err)=>{

    if(doc)
    {
     res.send(doc)
    }
    if(err)
    {
      res.send(err)
    }

  })




}