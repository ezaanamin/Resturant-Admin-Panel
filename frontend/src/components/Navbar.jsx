
import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween"
import { useDispatch } from "react-redux";
import { setMode } from "state";
import ProfilePic from "../assets/profile.jpeg"
import { useTheme } from "@emotion/react";
import { AppBar, IconButton, InputBase, Toolbar } from "@mui/material";
function Navbar({
  isSidebarOpen, setIsSidebarOpen
}) {
  const dispatch=useDispatch();
  const theme=useTheme();
  return (
  <>
  <AppBar
  sx={{
 position:"static",
 background:"none",
 boxShadow:"none"

  }}

  >
 <Toolbar sx={{justifyContent:"space-between"}}>
    <FlexBetween>
    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
  <MenuIcon/>

</IconButton>
<FlexBetween backgroundColor={theme.palette.background.alt}

borderRadius="9px"
gap="3rem"
p="0.1rem 1.5rem"
>
<InputBase placeholder="Search..."/>
<IconButton>

<Search/>
</IconButton>
</FlexBetween>
    </FlexBetween>
    <FlexBetween gap="1.5rem">
      <IconButton onClick={()=>dispatch(setMode())}>

{theme.palette.mode==="dark"?(
  <div style={{position:"relative",right:300}}>
<DarkModeOutlined sx={{fontSize:"25px"}}/>

</div>
):(
  <div style={{position:"relative",right:300}}>
  <LightModeOutlined sx={{fontSize:"25px"}}/>
  </div>
)}



      </IconButton>

      <div style={{position:"relative",right:300}}>

    <SettingsOutlined sx={{fontSize:"25px"}}/>
    </div>


    </FlexBetween>

 </Toolbar>


  </AppBar>
  
  </>
  )
}

export default Navbar