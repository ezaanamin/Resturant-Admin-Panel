import React, { useContext, useEffect } from 'react'
import Button from '@mui/material/Button';

import { useFormik} from 'formik';
import axios from 'axios'
import { useState} from 'react';
import TextField from "@material-ui/core/TextField";
import { UserContext } from "./../../context/context"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';

import { InputLabel } from '@mui/material';
import{Box}  from '@mui/material'
import { useNavigate } from 'react-router-dom';
 import { useDispatch } from 'react-redux';
 import { fetchOrderDetailsById } from '../../api/API';
import { uploadFile,addOrder,editOrder } from '../../api/API';
function EditProducts() {
  const location = useLocation();
   let [img,setImg]=useState("")
  const Id = location.pathname.split("/")[2];
 const nav=useNavigate()

  const [fileState,setFileState]=useState(false)
  const [fileInput,SetFileInput]=useState(true)
  const [file, setFile] = useState(null)
  const [res,setres]=useState(false)
  const dispatch=useDispatch()
  useEffect(() => {
    
    
    
    const fetchData = async () => {
      const response = await dispatch(fetchOrderDetailsById(Id));
 
      if (response && response.payload) {
     console.log(response.payload)
     SetProductName(response.payload.name)
     SetProductCostPrice(response.payload.price)
     SetProductPrice(response.payload.cost_price)
     SetProductCat(response.payload.cat)
       setImg(response.payload.img)



      }
    
    }
    fetchData()
  },[])
useEffect(()=>{
 if(file!=null)
 {
  setFileState(true)
 }
 
},[file])
useEffect(()=>{

  if(res==true)
  {
    setshow1(false)
    nav(`/products`)
  }
},[res])
  const [ProductName,SetProductName]=useState("");

  const [ProductPrice,SetProductPrice]=useState(0);
  const [ProductCostPrice,SetProductCostPrice]=useState(0);
  const [ProductCat,SetProductCat]=useState("")
      
const  Cost_onChange=(e)=>{
  let val = e.target.value;
  val = val.replace(/([^0-9.]+)/, "");
  val = val.replace(/^(0|\.)/, "");
  const match = /(\d{0,7})[^.]*((?:\.\d{0,2})?)/g.exec(val);
  const value = match[1] + match[2];
  e.target.value = value;
  SetProductCostPrice(value);
  if (val.length > 0) {
    e.target.value = Number(value).toFixed(2);
    e.target.setSelectionRange(this.start, this.start);
    SetProductCostPrice( Number(value).toFixed(2) );
  }
}
const Selling_onChange=(e)=>{

  let val = e.target.value;
  val = val.replace(/([^0-9.]+)/, "");
  val = val.replace(/^(0|\.)/, "");
  const match = /(\d{0,7})[^.]*((?:\.\d{0,2})?)/g.exec(val);
  const value = match[1] + match[2];
  e.target.value = value;
  SetProductPrice(value);
  if (val.length > 0) {
    e.target.value = Number(value).toFixed(2);
    e.target.setSelectionRange(this.start, this.start);
    SetProductPrice( Number(value).toFixed(2) );
  }


}


const upload = async () => {
  try {
    const imgUrl = await dispatch(uploadFile(file));
    console.log(imgUrl);
    return imgUrl; 
  } catch (err) {
    console.log(err.response);

  }
};

  const handleclose=()=>{
    SetShow(false)
    setshow1(false)
    nav(`/products`)
  }
  const { show,SetShow,show1,setshow1 }=useContext(UserContext)




 
  const options = [
    { label: "Starters", value: "Starters" },
    { label: "Breakfast", value: "Breakfast" },
    { label: "Lunch", value: "Lunch" },
    { label: "Dinner", value: "Dinner" },
    { label: "Dessert", value: "Dessert" },
    { label: "Beverage", value: "Beverage" },
  ]

  const handleClick = async () => {
    if (fileState === true) {
      try {
        const imgUrl = await upload(); 
        const response = await dispatch(editOrder({ Id, ProductName, ProductPrice, ProductCostPrice, ProductCat, imgUrl }));
    
        if (response && response.payload) {
          if (response.payload === "successful") {
            setres(true);
          }
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    } else {
      try {
        const response = await dispatch(editOrder({ Id, ProductName, ProductPrice, ProductCostPrice, ProductCat }));
    
        if (response && response.payload) {
          if (response.payload === "successful") {
            setres(true);
          }
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }

  }
  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused ? "#999999" : null,
        marginTop:"20px",
        color: "#333333"
      };
    }
  };

  const formik = useFormik({
    initialValues: {
      name:'',
      price:'',
      cost_price:'',
     cat:'',
    },
  

    onSubmit: (values) => {
     
    
      
       handleClick();
    },
    
    

    
  });


return(

  <div>

<Modal show={show1}>

<Modal.Header closeButton onClick={ handleclose}>
      {
        show1?
        <Modal.Title style={{color:"black"}}>Edit Product</Modal.Title>: 
<Modal.Title style={{color:"black"}}>Add a Product</Modal.Title>

      }
      
    </Modal.Header>
   <form  onSubmit={formik.handleSubmit}> 

    <Modal.Body>

    <div >
   


    <TextField
   
   id="name"
   name="name"
   label="Name"
   value={ProductName}
   onChange={e => SetProductName(e.target.value)}



  fullWidth
  

  

     margin="normal"
     variant="outlined"
   />



<TextField
               
               id="Cost Price"
               name="cost_price"
               label=" Selling Price"
               type="cost_price"
               value={ ProductCostPrice}
               onChange={(e) =>Cost_onChange(e)}

      
               margin="normal"
               variant="outlined"
               fullWidth



 />

        <TextField
               
                 id="price"
                 name="price"
                 label="Cost Price"
                 type="price"
                 value={ProductPrice}
                 onChange={(e) => Selling_onChange(e)}
                 margin="normal"
                 variant="outlined"
                 fullWidth
 


   />



{/* 
<FormControl fullWidth variant="outlined">
                          <InputLabel style={{color:"black"}} id="demo-simple-select-outlined-label">
                          Category
                          </InputLabel>
                          <Select 
                    
                            label="CAT"
                            onChange={formik.handleChange}
            
                            value={formik.values.password}
                            style={{marginBottom:"30px",color:"black"}}
                            name="category">
                             
                        
                            {options.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                    */}

{/* <Select
          name="mySelect"
          value={options.filter(({ value }) => value === myForm.mySelectKey)}
          placeholder="Category"
          getOptionValue={({ value }) => value}
          onChange={({ value }) => updateForm(value)}
          options={options}
          styles={colourStyles}
          fullWidth
        /> */}
   <Select
  
         name="cat"
         options={options}
         value={formik.values.options }

         styles={colourStyles}   
         defaultValue={{ label: ProductCat , value: ProductCat }}
         
         
        />
 
           {/* <Field as="select"  name="color"  >

             <option value="red">Red</option>

             <option value="green">Green</option>

             <option value="blue">Blue</option>

           </Field> */}

<Box display={"flex"} flexDirection="column" marginTop={"20px"}>
<InputLabel >Add a Image</InputLabel>
<div  style={{color:"red"}}>{file?file.name:img}</div>


<input
         
            type="file"
            id="file"
            name=""
            onChange={(e) => {setFile(e.target.files[0]);SetFileInput(false)}}
          />
      
      </Box>
      </div>
      
   
 







 



        

      
    </Modal.Body>

    <Modal.Footer>
  <Button type="submit"    variant="contained">
Edit 
</Button> 
      
    </Modal.Footer>
    </form> 



  </Modal>







  </div>
  )
}

export default  EditProducts