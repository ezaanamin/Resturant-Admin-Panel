import React, { useContext } from 'react'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,

  LogoutOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "../assets/profile.jpeg"
import { UserContext } from "../context/context"
import Cookies from 'universal-cookie';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import ReorderIcon from '@mui/icons-material/Reorder';
import KitchenIcon from '@mui/icons-material/Kitchen';
import AllInboxIcon from '@mui/icons-material//AllInbox';
import DirectionsBikeIcon from '@mui/icons-material//DirectionsBike';
import AssignmentIcon from '@mui/icons-material/Assignment';
const navItem=[{

text:"DashBorad",
icon:<HomeOutlined/>

},
{

  text:"CLient Facing",
  icon:null
  
  },
  {

    text:"Products",
    icon:<ShoppingCartOutlined/>
    
    },
    {

      text:"Customers",
      icon:<Groups2Outlined/>
      
      },
      {

        text:" All Orders",
        icon:<ReorderIcon/>
        
        },
      {

        text:" Pending Orders",
        icon:<KitchenIcon />
        
        },
        {

          text:"AssignOrders",
          icon:<AssignmentIcon/>
          
          },
        {

          text:"On Route",
          icon:<DirectionsBikeIcon/>
          
          },
        {
          text:"Delivered Orders",
          icon:<AllInboxIcon/>

        },
   
  

      {

        text:"Transactions",
        icon:<ReceiptLongOutlined/>
        
        },
        {

          text:"Rider",
          icon:<TwoWheelerIcon/>
          
          },
  

        {

          text:"Sales",
          icon:null
          
          },
          {

            text:"Overview",
            icon:<PointOfSaleOutlined/>
            
            },
            {

              text:"Daily",
              icon:<TodayOutlined/>
              
              },
              {

                text:"Monthly",
                icon:<CalendarMonthOutlined/>
                
                },
                {

                  text:"Breakdown",
                  icon:<PieChartOutlined/>
                  
                  },
               

]
function SideBar({  user1,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,}) {
    const {pathname}=useLocation();
    const [active,setActive]=useState("")
    const navigate=useNavigate();
    const cookies = new Cookies();

    const theme=useTheme()
     const logout=()=>{
      SetUser("")
     }
    const { user,SetUser,adminusername,SetAdminUserName,professional,SetProfessional}=useContext(UserContext)
    useEffect(()=>{


   setActive(pathname.substring(1))
    },[pathname])

    useEffect(()=>{
      if(user=="")
      {
        cookies.remove('jwt_authorization');

         console.log(cookies.getAll());
         navigate('/')
      }
    

    },[user])


  return (
    <>
<Box>
<Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">

           <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
 <Box display="flex" alignItems="center" gap="0.5rem">

  <Typography variant="h4" fontWeight="bold">
    AMIN RESTURANT
  </Typography>
 </Box>
 {!isNonMobile && (
<IconButton onClick={()=>  setIsSidebarOpen(!isSidebarOpen)}>

  <ChevronLeft/>
</IconButton>

 )}

            </FlexBetween>
            </Box>
            <List>
              {navItem.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
              
              
              </List> 
          </Box>
          <Box position="absolute" bottom="2rem">
     <Divider/>

     <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2 rem 0 3 rem">
      <Box 
      component="img"
      alt="profile"
      src={profileImage}
      height="40px"
      width="40px"
      borderRadius="50%"
      sx={{objectFit:"cover"}}

      >



      </Box>
      <Box textAlign="left">

<Typography
fontWeight="bold"
fontSize="0.9rem"
sx={{color:theme.palette.secondary[100]}}>
{adminusername}
</Typography>
<Typography fontSize="0.8rem" sx={{color:theme.palette.secondary[200]}}>
{professional}

</Typography>
</Box>
<SettingsOutlined
sx={{color:theme.palette.secondary[300],fontSize:"25px"}}>

</SettingsOutlined>
<LogoutOutlined onClick={logout} sx={{color:theme.palette.secondary[300],fontSize:"25px"}}  >
Lougout
  </LogoutOutlined>

     </FlexBetween>


          </Box>
    </Drawer>




    </Box>
    
    
    
    </>
  )
}

export default SideBar