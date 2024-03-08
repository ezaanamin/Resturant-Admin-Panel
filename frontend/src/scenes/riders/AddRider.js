import React, { useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useFormik} from 'formik';
import axios from 'axios'
import { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import { UserContext } from '../../context/context';
import Select from 'react-select';
import { Input } from '@material-ui/core';
import { InputLabel } from '@mui/material';
import{Box}  from '@mui/material'
import { useDispatch } from 'react-redux';
import { addRider } from '../../api/API';
function RiderAddForm() {


  const [fileInput,SetFileInput]=useState(true)


   const [file, setFile] = useState(null)


  const handleclose=()=>{
    SetShowAddRider(false)

  }
  const { ShowAddRider,SetShowAddRider,SetModalShow }=useContext(UserContext)


  const validationSchema = yup.object({
    name: yup
      .string('Enter the name of the rider')
      .required('Name is required'),
      email: yup
      .string('Enter your email')
      .required('email is required').email(),
  
  });

 
const dispatch=useDispatch();

  const handleClick = async (name,email) => {
 

    const response =      await dispatch(addRider({ name, email }));
  if(response && response.payload)
    {
      alert(response.payload)
      if(response.data="Sucessful")
      {
        SetShowAddRider(false)
      }
      if(response.payload=="User Exists")
      {
        SetShowAddRider(false)
        SetModalShow(true)
   
      }
    }
  }


  const formik = useFormik({
    initialValues: {
      name: '',
      email:''
   
    },
  
    validationSchema: validationSchema,
    onSubmit: (values) => {
     
        // SetProductName(values.name)
        // SetProductPrice( parseFloat(values.price),3)
        // SetProductCostPrice(parseFloat(values.cost_price),3)
        // SetProductCat(values.cat);
      
        handleClick(values.name,values.email);
    },
    
    

    
  });




  return (
    <Modal show={ShowAddRider} >
    <Modal.Header closeButton onClick={ handleclose}>


<Modal.Title style={{color:"black"}}>Add a Rider</Modal.Title>

    
      
    </Modal.Header>
   <form onSubmit={formik.handleSubmit}> 

    <Modal.Body>

    <div >
   


    <TextField
   
   id="name"
   name="name"
   label="Name"
   value={formik.values.name}
   onChange={e=>{formik.setFieldValue('name',e.target.value)}}
   error={formik.touched.name && Boolean(formik.errors.name)}
   helperText={formik.touched.name && formik.errors.name}
  fullWidth
  

  

     margin="normal"
     variant="outlined"
   />
    <div style={{color:"red"}}>{formik.errors.name}</div>

    <TextField
   
   id="email"
   name="email"
   label="Email"
   value={formik.values.email}
   onChange={e=>{formik.setFieldValue('email',e.target.value)}}
   error={formik.touched.email && Boolean(formik.errors.email)}
   helperText={formik.touched.email && formik.errors.email}
  fullWidth
  

  

     margin="normal"
     variant="outlined"
   />
    <div style={{color:"red"}}>{formik.errors.email}</div>





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

 
           {/* <Field as="select"  name="color"  >

             <option value="red">Red</option>

             <option value="green">Green</option>

             <option value="blue">Blue</option>

           </Field> */}
   

      </div>
      
   
 







 



        

      
    </Modal.Body>

    <Modal.Footer>
  <Button type="submit" disabled={!(formik.isValid && formik.dirty )}   variant="contained">
Submit
</Button> 
      
    </Modal.Footer>
    </form> 



  </Modal>
  )
}

export default RiderAddForm