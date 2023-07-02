import React, { useContext,useEffect } from 'react'
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { useState } from 'react';
import Cookies from 'universal-cookie';
import jwt from "jwt-decode"
import { UserContext } from "./../../context/context"
import { useNavigate } from "react-router-dom";
import axios from "../../axois/axois"
function Login() {
  const cookies=new Cookies()
  const navigate = useNavigate();
  const { user,SetUser,adminusername,SetAdminUserName,professional,SetProfessional}=useContext(UserContext)
  const [username,SetUserName]=useState("")
  const [password,SetPassword]=useState("")
  const [Error,SetError]=useState("");
  const validationSchema = yup.object({
    username: yup
      .string('Enter your username')
      .required('Username is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });


const handleClick = async (name,password1) => {
    const response = await axios.post('/users', {username:name,password:password1})
        .catch((error) => console.log('Error: ', error));
    if (response && response.data) {
        console.log(response);
        console.log(response.data);
        if(response.data!='Wrong password' || response.data!='Wrong username')
        {
          console.log("Ezaan Rules")
          SetAdminUserName(response.data.name)
          SetProfessional(response.data.professional)
          localStorage.setItem('Token', response.data.token);
          navigate("/dashborad")
        }
        if(response.data=='Wrong password' || response.data=='Wrong username')
        {
          alert(response.data)
        }
    
    }
};
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //  alert(JSON.stringify(values.username, null, 2));
      // SetUserName()
      // SetPassword()
      handleClick(values.username,values.password)
      
    },
  });

  return (
    <div style={{backgroundColor:"white",width:400,height:500,display:"block",marginRight:"auto",marginLeft:"auto",position:"relative",top:100}} >
      <form onSubmit={formik.handleSubmit}>
      <h1 style={{color:"black",fontWeight:"900",textAlign:"center"}}>Login</h1>
      <TextField
   
   id="username"
   name="username"
   label="UserName"
   value={formik.values.username}
   onChange={formik.handleChange}
   error={formik.touched.username && Boolean(formik.errors.username)}
   helperText={formik.touched.username && formik.errors.username}
       
           style={{display:"block",marginRight:"auto",marginLeft:"auto",position:"relative",left:70,top:40}}
     
       
    
          margin="normal"
          variant="outlined"
        />
             <TextField
                    
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      margin="normal"
                      variant="outlined"
      
           style={{display:"block",marginRight:"auto",marginLeft:"auto",position:"relative",left:70,top:70}}
     
        />
        <Button type="submit"    style={{display:"block",marginRight:"auto",marginLeft:"auto",position:"relative",top:20,width:300,top:100}}  variant="contained">
  Submit
</Button>


<h1 style={{display:"block",marginRight:"auto",marginLeft:"auto",position:"relative",top:40,top:100,color:"red"}}>{Error}</h1>

</form>


        
    </div>
  )
}

export default Login
