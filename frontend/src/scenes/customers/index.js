import React, { useState,useEffect } from 'react'
import {Box,useTheme} from "@mui/material"
import Header from '../../components/Header'
import {   DataGrid } from '@mui/x-data-grid'
import {  Chip, Stack } from "@mui/material"
import { DataGridPro, GridEventListener, useGridApiRef } from '@mui/x-data-grid-pro';
import { useDispatch } from 'react-redux'
import { GetCustomers } from '../../api/API'
import axios from "axios"
function Customers() {
  const theme=useTheme();
  const [customersData,SetCustomerData]=useState([])
  const apiRef = useGridApiRef();
 


const dispatch=useDispatch()
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await dispatch(GetCustomers());
      if (response && response.payload) {
        console.log(response.payload);
        SetCustomerData(response.payload);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  fetchData();
}, [dispatch]); 


  const columns = [
    {field:'_id',headerName:"Id",width:'200'},
    { field: 'name', headerName: 'Name' ,width:'200'},
    {field:"email",headerName:"Email",width:'200'},
    {field:"phone",headerName:"Phone",width:'200'},
    {field:"address",headerName:"Address",width:'400'},
    {
      field: "customers",
      headerName: "Orders ID",
      width: 300,
      type: "singleSelect",
      valueOptions: [...new Set(customersData.map((o) => o.orders).flat())],
      renderCell: (params) => (
        <Stack direction="row" spacing={0.25}>
          {params.row.orders.map((c) => (
            <Chip label={c} />
          ))}
        </Stack>
      )
    },

 
  ]
  
  return (
   <Box>
<Header title={"CUSTOMERS"} subtitle={"List of Customers"}/>

<Box position={"relative"} left="300px" mt="40px"
height='75vh'
width='140vh'
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
apiRef={apiRef}
rows={customersData}
columns={columns}
getRowId={(row)=>row._id}
/>


</Box>





   </Box>
  )
}

export default Customers