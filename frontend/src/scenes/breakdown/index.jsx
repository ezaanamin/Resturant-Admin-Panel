import React from 'react'
import {Box} from "@mui/material"
import Header from "../../components/Header"
import BreakDownChart from '../../components/BreakDownChart'

function BreakDown() {
    return (
        <Box m="1.5rem 2.5rem">
    
    <Header
      position={"relative"}
      left="300px" 
    title="BREAKDOWN"
    subtitle="Breakdown of Sales Category"
    />
    <Box height="300vh"
       position={"relative"}
       left="300px"
    
    
    >
        <BreakDownChart/>
 
          </Box>
        </Box>
    
    
    
    
    
        
      )
    }
    

export default BreakDown