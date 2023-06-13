import React, { useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useFormik} from 'formik';
import axios from 'axios'
import { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import { UserContext } from "./../../context/context"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

import Select from 'react-select';
import { Input } from '@material-ui/core';
import { InputLabel } from '@mui/material';
import{Box}  from '@mui/material'

 
function AddProducts({name}) {


  const [fileInput,SetFileInput]=useState(true)
  const [ProductName,SetProductName]=useState("");
  const [ProductPrice,SetProductPrice]=useState(0);
  const [ProductCostPrice,SetProductCostPrice]=useState(0);
  const [ProductCat,SetProductCat]=useState("")

   const [file, setFile] = useState(null)
  const upload = async () => {
    try {
      //console.log(file)
      const formData = new FormData();
      formData.append("file", file);
   console.log(formData)
      const res = await axios.post("http://localhost:4000/order/upload",formData);
  return res.data
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleclose=()=>{
    SetShow(false)
    setshow1(false)
  }
  const { show,SetShow,show1,setshow1 }=useContext(UserContext)


  const validationSchema = yup.object({
    name: yup
      .string('Enter the name of your product')
      .required('Name is required'),
    price: yup
      .number('Enter the price')
   
      .required(' Selling Price is required').moreThan(yup.ref("cost_price")),
      cost_price: yup
      .number('Enter the price')
      .required(' Cost Price is required'),
  
      cat:yup.string("Enter category ").required("category is required")
      

  
  });

 
  const options = [
    { label: "Starters", value: "Starters" },
    { label: "Breakfast", value: "Breakfast" },
    { label: "Lunch", value: "Lunch" },
    { label: "Dinner", value: "Dinner" },
    { label: "Dessert", value: "Dessert" },
    { label: "Beverage", value: "Beverage" },
  ]

  const handleClick = async (name,cat,price,cost_price) => {
 
    const imgUrl = await upload(); 
    console.log(imgUrl)
    const response = await axios
    .post('http://localhost:4000/order/',{
     name: name,
     price: price,
     cost_price: cost_price,
      cat: cat,
      img: file ? imgUrl : "",
  
  
    })
  
    .catch((error) => console.log('Error: ', error));
  if(response && response.data)
    {
      if(response.data="Sucessful")
      {
        SetShow(false)
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
      name: '',
      price:'',
      cost_price:'',
     cat:'',
    },
  
    validationSchema: validationSchema,
    onSubmit: (values) => {
     
        // SetProductName(values.name)
        // SetProductPrice( parseFloat(values.price),3)
        // SetProductCostPrice(parseFloat(values.cost_price),3)
        // SetProductCat(values.cat);
      
        handleClick(values.name,values.cat,(parseFloat(values.price)),(parseFloat(values.cost_price)));
    },
    
    

    
  });




  return (
    <Modal show={show1||show} >
    <Modal.Header closeButton onClick={ handleclose}>
      {
        show1?
        <Modal.Title style={{color:"black"}}>Edit Product</Modal.Title>: 
<Modal.Title style={{color:"black"}}>Add a Product</Modal.Title>

      }
      
    </Modal.Header>
   <form onSubmit={formik.handleSubmit}> 

    <Modal.Body>

    <div >
   


    <TextField
   
   id="name"
   name="name"
   label="Name"
   value={show1?name:formik.values.name}
   onChange={e=>{formik.setFieldValue('name',e.target.value)}}
   error={formik.touched.name && Boolean(formik.errors.name)}
   helperText={formik.touched.name && formik.errors.name}
  fullWidth
  

  

     margin="normal"
     variant="outlined"
   />
    <div style={{color:"red"}}>{formik.errors.name}</div>


<TextField
               
               id="Cost Price"
               name="cost_price"
               label="Cost Price"
               type="cost_price"
               value={formik.values.cost_price}
               onChange={e=>{formik.setFieldValue('cost_price',e.target.value)}}
               error={formik.touched.cost_price && Boolean(formik.errors.cost_price)}
               helperText={formik.touched.cost_price && formik.errors.cost_price}
               margin="normal"
               variant="outlined"
               fullWidth



 />
    <div  style={{color:"red"}}>{formik.errors.cost_price}</div>
        <TextField
               
                 id="price"
                 name="price"
                 label=" Selling Price"
                 type="price"
                 value={formik.values.price}
                 onChange={e=>{formik.setFieldValue('price',e.target.value)}}
                 error={formik.touched.price && Boolean(formik.errors.price)}
                 helperText={formik.touched.price && formik.errors.price}
                 margin="normal"
                 variant="outlined"
                 fullWidth
 


   />

<div  style={{color:"red"}}>{formik.errors.price}</div>

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
         value={formik.values.options}
         onChange={value=>{formik.setFieldValue('cat',value.value)}}
         styles={colourStyles}   
                 helperText={formik.touched.cat && formik.errors.cat}
         
         
        />
 
           {/* <Field as="select"  name="color"  >

             <option value="red">Red</option>

             <option value="green">Green</option>

             <option value="blue">Blue</option>

           </Field> */}
   
<div  style={{color:"red"}}>{formik.errors.cat}</div>        

<Box display={"flex"} flexDirection="column" marginTop={"20px"}>
<InputLabel >Add a Image</InputLabel>


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
  <Button type="submit" disabled={!(formik.isValid && formik.dirty&& !fileInput  )}   variant="contained">
Submit
</Button> 
      
    </Modal.Footer>
    </form> 



  </Modal>
  )
}

export default AddProducts