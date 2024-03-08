import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import{
Box,
Card,
CardAction,
CardContent,
Collapse,
Button,
Typography,
Rating,
useTheme,
useMediaQuery,



}  from '@mui/material'
import Header from '../../components/Header'
import { RingLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../../context/context"
import AddProducts from './AddProducts'

import Cookies from 'universal-cookie'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditProducts from './EditProduct'
import { fetchStarters, fetchBreakfast, fetchLunch, fetchDinner, fetchDessert, fetchBeverage,deleteOrder } from '../../api/API';
import { useDispatch } from 'react-redux'
const Product=({
id,
name,
img,
cat,
price

})=>{
const theme=useTheme();
const nav=useNavigate()
const [isExpanded,setIsExpanded]=useState(false);
const [price1,SetPrice]=useState(0)
const [cat1,SetCat]=useState("")
const { show,SetShow,show1,setshow1,productname,SetProductName }=useContext(UserContext)
const [e,sete]=useState("")
const dispatch=useDispatch()

async function hi(name)
{
  setshow1(true)
 nav(`/edit/${name}`)
}

async function bye(name)
{

  const response = await dispatch(deleteOrder(name));

  if (response && response.payload) {
         if(response.data=="Sucess")
         {
          alert("deleted")
         }
      
            

    

  }

}

return(
  
<Card onClick={ () =>  {SetProductName(name);SetPrice(price);SetCat(cat)}}
sx={{backgroundImage:"none",
backgroundColor:theme.palette.alt,
borderRadius:"0.55rem",
height:"450px",
width:"300px"

}}
>


<CardContent >
 
<EditIcon onClick={async () => { await hi(id)} }/> 
  {
    show1?
    <EditProducts name={productname} s_price={price1} cat1={cat1} />:null
  }
        <Typography variant="h5" component="div">
          {name} 
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {cat}
        </Typography>
        <img style={{width:'250px',height:'250px'}} src={`http://localhost:4000/upload/${img}`}/>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={3.5} readOnly />

    
      </CardContent>
  
    <DeleteIcon  onClick={async () => { await bye(id)} } />
     

</Card>



)

}

function Products() {
  const nav=useNavigate()
  const dispatch=useDispatch()


  const { show,SetShow }=useContext(UserContext)

    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const [itemsstarters,SetItemsstarters]=useState([]);
    const [itemsbreakfast,SetItemsbreakfast]=useState([]);
    const [itemslunch,SetItemslunch]=useState([]);
    const [itemsdinner,SetItemsdinner]=useState([]);
    const [itemsdessert,SetItemsdessert]=useState([]);
    const [itemsbeverage,SetItemsbeverage]=useState([]);
    const [loader,setLoader]=useState(false)
    
    useEffect(() => {
    
    
    
        const fetchData = async () => {
          const response = await dispatch(fetchStarters());
        console.log(response)
          if (response && response.payload) {
         
      
            
            SetItemsstarters(response.payload)
            
   
          }
        
        }
        const fetchData1 = async () => {
          const response = await  await dispatch(fetchBreakfast());
    
          if (response && response.payload) {
         
         
            
            SetItemsbreakfast(response.payload)
            
   
          }
        }
        const fetchData2 = async () => {
          const response = await   dispatch(fetchLunch());
    
          if (response && response.payload) {
    
            
            SetItemslunch(response.payload)
            
   
          }
        }
        const fetchData3 = async () => {
          const response = await   dispatch(fetchDinner());
    
          if (response && response.payload) {
         
         
            
            SetItemsdinner(response.payload)
            
   
          }
        }
        const fetchData4 = async () => {
          const response = await   dispatch(fetchDessert());
    
          if (response && response.payload) {
          
            console.log(response.payload)
      
            
            SetItemsdessert(response.payload)
            
   
          }
        }
        const fetchData5 = async () => {
          const response =  await  dispatch(fetchBeverage());
    
          if (response && response.payload) {
         
            SetItemsbeverage(response.payload)
            
   
          }
        }
        // call the function
        fetchData()
        fetchData1()
        fetchData2()
        fetchData3()
        fetchData4()
        fetchData5()

        
          .catch(function (error) {
            if (error.response) {
                setLoader(true)
            }
        }) 
    

      }, [])

const buttonclick=()=>
{
  SetShow(true)

}
  return (
    <>
    {
  show?
  <AddProducts />:
  null
}
   <Box >

    <Header title=" PRODUCTS" subtitle={"See all your products in a list"}/>
    <Button className="position-relative" style={{color:"black",position:"relative",left:1700,bottom:50,backgroundColor:"#ffe3a3"}} onClick={buttonclick}>Add a Product</Button>
   </Box>
   {loader?
    <div className="ring-loader" style={{minHeight: "50vh", display: "grid", placeContent: "center"}}>
    <RingLoader
              color={'white'}
              loading={loader}
              
            />
            
      </div>
      :
    <div>
       <Box  
       mt="20px"
       display="grid"
       gridTemplateColumns="repeat(3,minmax(0,1fr))"
       justifyContent=""
       rowGap="10px"
       columnGap="-400px"
      position={"relative"}
      left="300px"
       sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
       }}
    >
{itemsstarters.map(({ name, img,cat,price,_id}) => (
    <>
  <Product name={name}
  img={img}
  price={price}
  cat={cat}
  
  id={_id}>


  </Product>
    
        </>
      ))}
      {itemsbreakfast.map(({ name, img,cat,price,_id }) => (
    <>
  <Product name={name}
  img={img}
  price={price}
  cat={cat}
  
  id={_id}>


  </Product>
    
        </>
      ))}
      {itemslunch.map(({ name, img,cat,price,_id }) => (
    <>
  <Product name={name}
  img={img}
  price={price}
  cat={cat}
  
  id={_id}>


  </Product>
    
        </>
      ))}
      {itemsdinner.map(({ name, img,cat,price,_id }) => (
    <>
  <Product name={name}
  img={img}
  price={price}
  cat={cat}
  id={_id}>


  </Product>
    
        </>
      ))}
      {itemsdessert.map(({ name, img,cat,price,_id }) => (
    <>
  <Product name={name}
  img={img}
  price={price}
  cat={cat}
  id={_id}>


  </Product>
    
        </>
      ))}
      {itemsbeverage.map(({ name, img,cat,price,_id }) => (
    <>
  <Product name={name}
  img={img}
  price={price}
  cat={cat}
id={_id}
  
  >


  </Product>
    
        </>
      ))}
    </Box> 
        

        

        </div>}
    </>
  )
}

export default Products