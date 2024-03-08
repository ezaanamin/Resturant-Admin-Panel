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

const  passwords=[
    "passwordabc",
    "passwordxyz",
    "password456",
    "password789",
    "passwordabc",
    "password123",
    "password456",
    "password789",
    "passwordabc",
    "password123",
    "password123",
    "password456",
    "password789"
  ]
  
try {
  passwords.forEach(password => {
      const hashedPassword = bcrypt.hashSync(password, 10);
      console.log(`Original Password: ${password}, Hashed Password: ${hashedPassword}`);
  });
} catch (err) {
  console.log(`Error hashing passwords: ${err}`);
}
}
 