import OverallStats from "../model/OverallStats.js"

export const GetSales= async (req, res) => {

    try{
         const overall=  await OverallStats.find()
         res.json(overall[0])

    }
    catch(err)
    {
        res.json(err)
    }









}