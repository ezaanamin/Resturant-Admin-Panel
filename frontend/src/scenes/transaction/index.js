import React, { useState,useEffect } from 'react'
import {Box,useTheme} from "@mui/material"
import Header from '../../components/Header'
import {   DataGrid } from '@mui/x-data-grid'
import { DataGridPro, GridEventListener, useGridApiRef } from '@mui/x-data-grid-pro';
import axios from "axios"
import moment from "moment"
import {  Chip, Stack } from "@mui/material"
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar"
function Transaction() {
    const theme=useTheme();
    const [customersData,SetCustomerData]=useState([])
    const [transation,SettransationData]=useState([])
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const apiRef = useGridApiRef();
   
  
  
  
    useEffect(() => {
      
      
      
      const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/transaction/');
      
        if (response && response.data) {
            console.log(response.data)
            SettransationData(response.data)
            for(let i=0;i<response.data.length;i++)
            {
                SetCustomerData(response.data[i].customers[0])
                           
            }
           
    
          
          
          
  
        }
      
      }
   
      // call the function
      fetchData()
     
      
        .catch(function (error) {
          if (error.response) {
               console.log(error)
          }
      }) 
  
  
    }, [])
 
    const columns = [
  
        {field:'_id',headerName:"Id",width:'200'},
        {
            field: "customers",
            headerName: "Name",
            width: 300,
            type: "singleSelect",
            valueOptions: [...new Set(transation.map((o) => o.customers).flat())],
            renderCell: (params) => (
              <Stack direction="row" spacing={0.25}>
                {params.row.customers.map((c) => (
                  <Chip label={c.name} />
                ))}
              </Stack>
            )
          },
        {field:"total_amount",headerName:"price",width:'100',renderCell:(parm)=>{
            return '$'+parm.value
          }},
        {field:"transaction_type",headerName:"transaction_type",width:'200'},
        {field:"Date",headerName:"Date",width:'200',  valueFormatter: params => 
        moment(params?.value).format("DD/MM/YYYY hh:mm A"),},
        {field:"order_id",headerName:"Order_ID", width:'100',
      renderCell:(parm)=>{
        return '#'+parm.value
      }},
   
      ]
      
  return (

        <Box>

     <Header title={"TRANSACATION"} subtitle={"List of Transacation"}/>
     
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
     rows={transation}
     columns={columns}
     getRowId={(row)=>row._id}
     rowCount={(transation && transation.total) || 0}
     rowsPerPageOptions={[20, 50, 100]}
     pagination
  
     paginationMode="server"
     sortingMode="server"
     components={{ Toolbar: DataGridCustomToolbar }}
     componentsProps={{
      toolbar: { searchInput, setSearchInput, setSearch },
    }}
     />

     
     </Box>
     
     
     
     
     
        </Box>
       )
  
}

export default Transaction