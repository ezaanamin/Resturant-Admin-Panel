import  Customer from "../model/customers.js";
import Product from "../model/products.js";
import  bcrypt from "bcrypt"
export const GetCustomers = async (req, res) => {
    Customer.find({}).then(function(doc) {
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
export const  CustomerOrder= async (req, res) => {
  Customer.findOne({}).then(function(doc) {
    if(doc)
    {
      var arr=doc.toObject();
  var id=arr.orders[0]

  Product.findById(id, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        console.log("Result : ", docs);
    }

  })

    }
    else
    {
        console.log("bye")
      
    }



    })

}

export const CalculateTotalAmount = async (req, res) => {

    Customer.findById('63f5b6931ec7e7122b340e1b').then(function(doc) {
        if(doc)
        {
  
         let total_amount=0;
          var arr=doc.toObject();
    
      for (let i = 0; i < arr.orders.length; i++) { 
    var id=arr.orders[i]
      Product.findById(id, function (err, docs) {
        if (err){
            res.json(err);
        }
        else{
            console.log("Result : ", docs);
            total_amount+=docs.price
         
        }
        console.log(total_amount)
      })
   

      }
    
  
        }
        else
        {
            console.log("bye")
          
        }
    
    
    
        })
    

}
export function hashPassword() {
   bcrypt.hash('AvaJosh@2002', 10)
        .then(hash => {
           console.log(hash)
        })
        .catch(err => {
            console.log(err)
        })
}
 