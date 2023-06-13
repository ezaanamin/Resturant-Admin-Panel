import React from 'react'
import { Typography,Box,useTheme } from '@mui/material'
function Header({title,subtitle,left}) {
    const theme=useTheme()
  return (
     <Box>
<Typography
position={"relative"}
left="300px"
variant='h2'
color={theme.palette.secondary[100]}
fontWeight="bold"
sx={{mb:"5px"}}>
{title}

</Typography>

<Typography variant='h5' style={{position:"relative",left:left}} 
 color={theme.palette.secondary[300]}>
    {subtitle}
</Typography>


     </Box>
  )
}

export default Header