import React, { useState,useEffect } from 'react'
import {Box,useTheme} from "@mui/material"
import Header from '../../components/Header'
import {   DataGrid } from '@mui/x-data-grid'
import { UserContext } from '../../context/context'
import axios from "axios"
import { useContext } from 'react'
import {  Chip, Stack } from "@mui/material"
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar"
import Modal1 from "../../components/RiderModal"
import { useDispatch } from 'react-redux'
import { GetRiders,GetRidersRoutesOrders } from '../../api/API'
function OnRoute() {
  const theme=useTheme();
const [Orders,SetOrdersData]=useState([])
const [riders,setRiders]=useState([])
const {showRiders,order_id}=useContext(UserContext)
const dispatch=useDispatch();
  useEffect(() => {
    
    
    
    const fetchData = async () => {
      const response = await dispatch(GetRidersRoutesOrders());
 
      if (response && response.payload) {


        
        SetOrdersData( response.payload)
        
  
        console.log(response.payload,'ezaan')
        

      }

    
    }
    const fetchData1 = async () => {
      try {
        const response = await dispatch(GetRiders());
        if (response && response.payload) {
          setRiders(response.payload);
        }
      } catch (error) {
        console.error("Error fetching riders:", error);
      }
    };


  
    // call the function
    fetchData()
    fetchData1()


    

  

    
      .catch(function (error) {
        if (error.response) {
            console.log(error.response)
        }
    }) 

  }, [])


  const columns = [
  
    {field:'_id',headerName:"Id",width:'200'},
    {
      width:100,
      field:"order_id",headerName:"Order ID",      renderCell:(parm)=>{
        return '#'+parm.value
    }},
    {
      field: 'products',
      headerName: 'Name',
      width: 500,
      type: 'singleSelect',
      valueOptions: [], // This should be populated with unique product names
      renderCell: (params) => (
        <Stack direction="row" spacing={0.25}>
          {params.row.orders.map((product) => ( // Iterate through orders array to get product names
            <Chip key={product._id} label={product.name} />
          ))}
        </Stack>
      ),
    },

    {
      field: "riders",
      headerName: "Rider Name",
      width: 500,
      type: "singleSelect",
      renderCell: (params) => (
        <Stack direction="row" spacing={0.25}>
        <Chip label={params.row.rider.name} />
        </Stack>
      )
    }
      
  
  


  ]

 
  return (

    <Box>

{showRiders?
<Modal1 order_id={order_id} riders={riders}/>:null

}
 <Header title={"On Route Orders"} subtitle={"List of all Route Orders"}/>
 
 <Box mt="40px"
position={"relative"} left="300px" 
height='75vh'
width='120vh'
 sx={{
   "& .MuiDataGrid-root": {
     border: "none",
   },
   "& .MuiDataGrid-cell": {
     borderBottom: "none",
   },
   "& .MuiDataGrid-columnHeaders": {
     backgroundColor: theme.palette.background.alt,
     color: theme.palette.secondary[100],
     borderBottom: "none",
   },
   "& .MuiDataGrid-virtualScroller": {
     backgroundColor: theme.palette.primary.light,
   },
   "& .MuiDataGrid-footerContainer": {
     backgroundColor: theme.palette.background.alt,
     color: theme.palette.secondary[100],
     borderTop: "none",
   },
   "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
     color: `${theme.palette.secondary[200]} !important`,
   },
 }}
 >
 
 <DataGrid 
    rows={Orders}
    columns={columns}
    getRowId={(row)=>row._id}
    rowCount={(Orders && Orders.total) || 0}
    rowsPerPageOptions={[20, 50, 100]}
    pagination

 
    paginationMode="server"
    sortingMode="server"
    components={{ Toolbar: DataGridCustomToolbar }}

    />

 
 </Box>
 
 
 

 
    </Box>
   )

}

export default OnRoute