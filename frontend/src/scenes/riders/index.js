import React, { useState,useEffect } from 'react'
import {Box,useTheme,Button,} from "@mui/material"
import Header from '../../components/Header'
import {   DataGrid } from '@mui/x-data-grid'
import { DataGridPro, GridEventListener, useGridApiRef } from '@mui/x-data-grid-pro';
import axios from "axios"
import moment from "moment"
import {  Chip, Stack } from "@mui/material"
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar"
import Rating from "@material-ui/lab/Rating";
import { UserContext } from '../../context/context';
import { useContext } from 'react';
import RiderAddForm from './AddRider';
import SimpleModal from '../../components/SimpleModal';
function Rider() {
  const {     ShowAddRider,SetShowAddRider,modalShow  }=useContext(UserContext)

  const theme=useTheme();
  const[show,SetSHow]=useState(false)
  
  const [rider,SetRider]=useState([])
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const apiRef = useGridApiRef();
 

  const buttonclick=()=>
{
  SetShowAddRider(true)

}

useEffect(()=>{

  if(modalShow==true)
  {
    SetSHow(true)
  }
  else
  {
    SetSHow(false)
  }




},[modalShow])
  useEffect(() => {
    
    
    
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4000/riders');
    
      if (response && response.data) {
          console.log(response.data)
          SetRider(response.data)
  
        
        
        

      }
      else
      {
        console.log("error")
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
          field: "name",
          headerName: "Name",
          width: 200},
          {
            field: "all_orders",
            headerName: "All Orders",
            width: 200,
            renderCell:(parm)=>{
              if(parm.value=="")
              {
                return 'None'
              }
              else if(parm.value!="")
              {

              
              
              return '#'+parm.value
              }
            }},
            {
              field: "delivered_order",
              headerName: "Delivered Orders",
              width: 200,
              renderCell:(parm)=>{
                if(parm.value=="")
                {
                  return 'None'
                }
                else if(parm.value!="")
                {

                
                
                return '#'+parm.value
                }
              }},
            
              {
                field: "pending_order",
                headerName: "Pending Orders",
                width: 200,
                renderCell:(parm)=>{
                  if(parm.value=="")
                  {
                    return 'None'
                  }
                  else if(parm.value!="")
                  {

                  
                  
                  return '#'+parm.value
                  }
                }},
         
                {
                  field: "rating",
                  headerName: "Rating",
                  width: 200,
                  renderCell:(parm)=>{
                    return <Rating name="size-large" defaultValue={parm.value} size="large" />
                  }},
              ]
return (

      <Box>



{
  ShowAddRider?
  <RiderAddForm/>
  :null
}

{
  show?
  <SimpleModal heading={"User Exist"}/>
  :null
}

   <Header title={"RIDERS"} subtitle={"List of all Riders"}/>

   <Button className="position-relative" style={{color:"black",position:"relative",left:1700,bottom:50,backgroundColor:"#ffe3a3"}} onClick={buttonclick}>Add Rider</Button>

   
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
     rows={rider}
     columns={columns}
     getRowId={(row)=>row._id}
     rowCount={(rider && rider.total) || 0}
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
export default Rider