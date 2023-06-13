
import { CssBaseline,ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { themeSettings } from "./theme"
import { UserContext } from './context/context'
import Routes from './scenes/Routes';
function App() {

  const [user,SetUser]=useState("")
  const [show1,setshow1]=useState(false)
  const [adminusername,SetAdminUserName]=useState("")
  const [professional,SetProfessional]=useState("")
  const [productname,SetProductName]=useState("")
  const [show,SetShow]=useState(false)
  const [showRiders,SetRidersShow]=useState(false);
  const [order_id,SetOrderID]=useState(0);
  const[submitRider,SetSubmitRider]=useState(false)
  const [statusShow,SetStatusShow]=useState(false)
  const [ShowAddRider,SetShowAddRider]=useState(false)
  const [modalShow,SetModalShow]=useState(false)
  const  value={user,SetUser,
    adminusername,SetAdminUserName,
    professional,SetProfessional,
    show,SetShow,
    show1,setshow1,
    productname,SetProductName,
    showRiders,SetRidersShow,
    order_id,SetOrderID,
    submitRider,SetSubmitRider,
    statusShow,SetStatusShow,
    ShowAddRider,SetShowAddRider,
    modalShow,SetModalShow
  
  }

  


  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);





  return (
<UserContext.Provider value={value}>
    <div className="app">

<ThemeProvider theme={theme}>

  <CssBaseline/>

<Routes/>

</ThemeProvider>


    </div>
</UserContext.Provider>
  );
}

export default App;
