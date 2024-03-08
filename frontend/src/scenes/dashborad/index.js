

import React, { useEffect, useState } from "react";
import FlexBetween from "./../../components/FlexBetween";
import Header from "./../../components/Header"
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import OverviewChart from "./../../components/OverviewChart";
import StatBox from "./../../components/StatBox";
import axios from "../../axois/axois"
import {  Chip, Stack } from "@mui/material"
import moment from "moment";
import { useDispatch } from "react-redux";
import { GetGeneral,GetTransaction } from "../../api/API";
function DashBorad() {

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [data,SetData]=useState([])
  const [transaction,SettransationData]=useState([])
  const [customersData,SetCustomerData]=useState([])
  const dispatch=useDispatch()

   
  useEffect(() => {
    
    
    
    const fetchData = async () => {
      try {
        const response = await dispatch(GetGeneral());
       console.log(response.payload,'ezaan amin')
        if (response && response.payload) {
          SetData(response.payload);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
      }
    
    
  
        
    
    
    }
    const fetchData1 = async () => {
      const response = await dispatch(GetTransaction());
    
      if (response && response.payload) {
          console.log(response.data)
          SettransationData(response.payload)
          for(let i=0;i<response.payload.length;i++)
          {
              SetCustomerData(response.payload[i].customers[0])
                         
          }
         
  
        
        
        

      }
    
    }
 
    // call the function
    fetchData()
    fetchData1()
   
    
      .catch(function (error) {
        if (error.response) {
             console.log(error)
        }
    }) 


  }, [])
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];
  const columns1 = [
  
    {field:'_id',headerName:"Id",width:'200'},
    {
        field: "customers",
        headerName: "Name",
        width: 300,
        type: "singleSelect",
        valueOptions: [...new Set(transaction.map((o) => o.customers).flat())],
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
    {field:"transaction type",headerName:"transaction type",width:'200'},
    {field:"Date",headerName:"Date",width:'200',  valueFormatter: params => 
    moment(params?.value).format("DD/MM/YYYY hh:mm A"),},
    {field:"order_id",headerName:"Order_ID", width:'100',
  renderCell:(parm)=>{
    return '#'+parm.value
  }},

  ]
  return (
    <Box  m="1.5rem 2.5rem">
    <FlexBetween>
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      
      <Box>
        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlined sx={{ mr: "10px" }} />
          Download Reports
        </Button>
      </Box>
    </FlexBetween>
    <Box
    position={"relative"} left="300px" 
      mt="20px"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="160px"
      gap="20px"
      sx={{
        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
      }}
    >
      {/* ROW 1 */}
      <StatBox
        title="Total Customers"
        value={data && data.totalCustomers}
        increase="+14%"
        description="Since last month"
        icon={
          <Email
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
          />
        }
      />
      <StatBox
        title="Yearly Units"
       value={data && data.yearlyTotalSoldUnits}
        increase="+21%"
        description="Since last month"
        icon={
          <PointOfSale
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
          />
        }
      />
            <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        borderRadius="0.55rem"
        width={"900px"}
      >
        <OverviewChart view="sales" isDashboard={true} />
      </Box>
      <StatBox
        title="Monthly Sales"
     
        increase="+5%"
        description="Since last month"
        icon={
          <PersonAdd
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
          />
        }
      />
            <StatBox
        title="Yearly Sales"
        value={data && data.yearlySalesTotal}
        increase="+43%"
        description="Since last month"
        icon={
          <Traffic
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
          />
        }
      />
      </Box>
      <Box
        gridColumn="span 8"
        gridRow="span 3"
        height={"400px"}
        position={"relative"} left="300px" 
        top="30px"
        width={"1500px"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "5rem",
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
            backgroundColor: theme.palette.background.alt,
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
            rows={transaction}
          getRowId={(row) => row._id}
          
        
          columns={columns1}
        />
        </Box>
      
     </Box>
  );
};


export default DashBorad