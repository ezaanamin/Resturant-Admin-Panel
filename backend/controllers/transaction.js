import Customer from "../model/customers.js";
import Transaction from "../model/transaction.js"

export const GetTransaction= async (req, res) => {
 
   
    Transaction.aggregate( [
        {
          $lookup:
            {
              from: "customers",
              localField: "customer_id",
              foreignField: "_id",
              as: "customers"
            }
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
