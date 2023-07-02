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


async function hi(name)
{
  setshow1(true)
 nav(`/edit/${name}`)
}

async function bye(name)
{

  const response = await axios.delete(`http://localhost:4000/order/delete/order/${name}`);

  if (response && response.data) {
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
          const response = await axios.get('http://localhost:4000/order/get/starters');
        console.log(response)
          if (response && response.data) {
         
      
            
            SetItemsstarters(response.data)
            
   
          }
        
        }
        const fetchData1 = async () => {
          const response = await axios.get('http://localhost:4000/order/get/breakfast');
    
          if (response && response.data) {
         
         
            
            SetItemsbreakfast(response.data)
            
   
          }
        }
        const fetchData2 = async () => {
          const response = await axios.get('http://localhost:4000/order/get/lunch');
    
          if (response && response.data) {
    
            
            SetItemslunch(response.data)
            
   
          }
        }
        const fetchData3 = async () => {
          const response = await axios.get('http://localhost:4000/order/get/dinner');
    
          if (response && response.data) {
         
         
            
            SetItemsdinner(response.data)
            
   
          }
        }
        const fetchData4 = async () => {
          const response = await axios.get('http://localhost:4000/order/get/dessert');
    
          if (response && response.data) {
          
            console.log(response.data)
      
            
            SetItemsdessert(response.data)
            
   
          }
        }
        const fetchData5 = async () => {
          const response = await axios.get('http://localhost:4000/order/get/beverage');
    
          if (response && response.data) {
         
            SetItemsbeverage(response.data)
            
   
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