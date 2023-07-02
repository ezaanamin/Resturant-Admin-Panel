import React, { useState,useContext } from 'react'
import {Box,useMediaQuery} from "@mui/material"
import { useSelector } from 'react-redux'
import Navbar from './../../components/Navbar'
import { Outlet } from 'react-router'
import SideBar from './../../components/SideBar'
import { UserContext } from "./../../context/context"
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getToken, decodeToken, isTokenExpired } from 'react-jwt';
function Layout() {
  const isMoblie=useMediaQuery("(min-width:600px)")
  const [isSideBarOpen,setIsSideBarOpen]=useState(true)
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const nav=useNavigate()
    useEffect(() => {
      const token = localStorage.getItem('Token');
      if (token) {
        const expirationTime = decodeToken(token).exp * 1000     
         if (Date.now() > expirationTime) {
          localStorage.removeItem('Token');
        } else {
          const timeoutId = setTimeout(() => {
            localStorage.removeItem('Token');
           nav("/")

          }, expirationTime - Date.now());
  
          return () => clearTimeout(timeoutId);
        }
      }
    }, []);



  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
 
 <SideBar isNonMobile={isNonMobile}
 drawerWidth="250px"
 isSidebarOpen={isSidebarOpen}
 setIsSidebarOpen={setIsSideBarOpen}
 
 />
           <Navbar styles={{display:"none"}} 
      
      
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      />
    <Box>

    </Box>

<Outlet/>

   </Box>
  )
}

export default Layout