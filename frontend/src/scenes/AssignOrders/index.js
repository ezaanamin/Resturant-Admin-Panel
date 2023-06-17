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
import io from 'socket.io-client';

function AssignOrders() {
  const theme=useTheme();
const [Orders,SetOrdersData]=useState([])
const [riders,setRiders]=useState([])
const {     showRiders,SetRidersShow,order_id,SetOrderID}=useContext(UserContext)

const socket=io.connect("http://localhost:4000/");

useEffect(()=>{

  socket.on('statusChanged', data => {



  const filtered = data.filter(item => item.status.includes("Pending"));
  SetOrdersData(filtered)

 

});


},[socket])




  useEffect(() => {
    
    
    
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4000/order/riders/orders/details');
 
      if (response && response.data) {
     
     
   console.log(response.data,'ezaanamin1')
        
        SetOrdersData(response.data)
        

      }

    
    }
    const fetchData1 = async () => {
      const response = await axios.get('http://localhost:4000/riders');
 
      if (response && response.data) {
     
  
        setRiders(response.data)

   
        

      }

    
    }



  
    // call the function
    fetchData()
    fetchData1()


    

  

    
      .catch(function (error) {
        if (error.response) {
            console.log(error.response)
        }
    }) 


  }, [])
useEffect(()=>{

},[])


  const columns = [
  
    {field:'_id',headerName:"Id",width:'200'},
    {
      width:100,
      field:"order_id",headerName:"Order ID",      renderCell:(parm)=>{
        return '#'+parm.value
    }},
    {
        field: "products",
        headerName: "Name",
        width: 500,
        type: "singleSelect",
        valueOptions: [...new Set(Orders.map((o) => o.products))],
        renderCell: (params) => (
          <Stack direction="row" spacing={0.25}>
            {params.row.products.map((c) => (
              <Chip label={c.name} />
            ))}
          </Stack>
        )
      },
      {
        field: "riders",
        headerName: "Rider Name",
        width: 500,
        type: "singleSelect",
        valueOptions: [...new Set(Orders.map((o) => o.products))],
        renderCell: (params) => (
          <Stack direction="row" spacing={0.25}>
            {params.row.riders.map((c) => (
              <Chip label={c.name} />
            ))}
          </Stack>
        )
      },

      

  


  ]

 
  return (

    <Box>

{showRiders?
<Modal1 order_id={order_id} riders={riders}/>:null

}
 <Header title={" Assigned  Orders"} subtitle={"List of all Orders"} left={300}/>
 
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

export default AssignOrders