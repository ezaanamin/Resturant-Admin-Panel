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
import { useDispatch } from 'react-redux'
import { GetOrdersDetails,GetRiders } from '../../api/API'

function PendingOrders() {
  const theme=useTheme();
const [Orders,SetOrdersData]=useState([])
const [riders,setRiders]=useState([])
const {     showRiders,SetRidersShow,order_id,SetOrderID}=useContext(UserContext)

const socket=io.connect("http://localhost:4000/");

useEffect(()=>{

  socket.on('OrderAdd', data => {


  //console.log(data)
  const filtered = data.filter(item => item.status.includes("Pending"));
  SetOrdersData(filtered)

 

});


},[socket])





const dispatch=useDispatch();


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await dispatch(GetOrdersDetails());
      if (response && response.payload) {
        console.log(response.payload, 'ezaanamin1');
        SetOrdersData(response.payload);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

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

  fetchData();
  fetchData1();
}, []);
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
        field: 'Dispatch',
        headerName: 'Dispatch',
        sortable: false,
        width:400,
        renderCell: (params) => {
          const onClick = (e) => {
           let orderid=params.row.order_id
           SetOrderID(orderid)
     SetRidersShow(true)
    
        
       

          };
    
          return <button style={{borderColor:"black",borderRadius:"20px",backgroundColor:"#ffe3a3",color:"black",width:100,height:500,fontWeight:"bold",marginBottom:10}} onClick={onClick}>Dispatch</button>;
        },
      },
  
  


  ]

 
  return (

    <Box>

{showRiders?
<Modal1 order_id={order_id} riders={riders}/>:null

}
 <Header title={" Pendings Orders"} subtitle={"List of all Pending  Orders"}/>
 
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

export default PendingOrders