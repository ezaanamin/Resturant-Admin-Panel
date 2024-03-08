import React, { useContext,useEffect } from 'react'
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { useState } from 'react';
import Cookies from 'universal-cookie';
import { UserContext } from "./../../context/context"
import { useNavigate } from "react-router-dom";
import axios from "../../axois/axois"
import Logo from "../../assets/Amin Resturant-logos_white.png"
import { useDispatch } from 'react-redux';
import { loginUser } from '../../api/API';
function Login() {
  const dispatch=useDispatch()
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

  const handleClick = async (name, password1) => {
    try {
      const response = await dispatch(loginUser({ username: name, password: password1 }));
      console.log(response);
      console.log(response.payload);
      console.log("Ezaan Rules");
      navigate("/dashborad");
    } catch (error) {
      console.error('Error: ', error);
      alert(error.message);
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
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "20px", 
    }}>
      <div style={{
        backgroundColor:'white',
        width: "50%", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to left, white)", 
        borderRadius: "20px", 
       
      }}>
        <form onSubmit={formik.handleSubmit} style={{ width: "80%", textAlign: "center" }}>
          <h1 style={{ color: "black", fontWeight: "900" }}>Restaurant Admin Panel</h1>
          <TextField
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
            variant="outlined"
            style={{ width: "100%", marginBottom: "20px", borderRadius: "10px" }} // Adding border radius to text fields
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
            style={{ width: "100%", marginBottom: "20px", borderRadius: "10px" }} // Adding border radius to text fields
          />
          <Button type="submit" variant="contained" style={{ width: "100%", borderRadius: "10px" }}> {/* Adding border radius to the button */}
            Submit
          </Button>
          {Error && <h1 style={{ color: "red", marginTop: "20px" }}>{Error}</h1>}
        </form>
      </div>
  
      <div style={{ width: "50%" }}> 
        <img src={Logo} alt="Restaurant Logo" style={{ width: "100%" }} />
      </div>
    </div>
  );
  
}

export default Login
