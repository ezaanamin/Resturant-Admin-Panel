import React, { useState,useContext } from 'react'
import {Box,useMediaQuery} from "@mui/material"
import { useSelector } from 'react-redux'
import Navbar from './../../components/Navbar'
import { Outlet } from 'react-router'
import SideBar from './../../components/SideBar'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { decodeToken } from 'react-jwt';
function Layout() {
  const isMoblie=useMediaQuery("(min-width:600px)")
  const [isSideBarOpen,setIsSideBarOpen]=useState(true)
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const nav=useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        if (decodedToken) {
          const expirationTime = decodedToken.exp * 1000;
          if (Date.now() > expirationTime) {
            localStorage.removeItem('Token');
          } else {
            const timeoutId = setTimeout(() => {
              localStorage.removeItem('Token');
              nav("/");
            }, expirationTime - Date.now());
            
            return () => clearTimeout(timeoutId);
          }
        } else {
        
          alert('Wrong Password');
          localStorage.removeItem('Token');
          nav("/");
        }
      } catch (error) {
      
        console.error('Error decoding token:', error);
        localStorage.removeItem('Token');
        nav("/");
      }
    } else {
      // Handle case when token is null (not present in localStorage)
      nav("/");
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