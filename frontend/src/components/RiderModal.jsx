import React, { useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { Link } from "react-router-dom";

import { UserContext } from "../context/context";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import CloseIcon from '@material-ui/icons/Close';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axois from "axios"
function getModalStyle() {


  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor:"white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
    color:"black"
    
  }
}));

function SimpleModal({order_id,riders}) {


 

    const {     showRiders,SetRidersShow,submitRider,SetSubmitRider}=useContext(UserContext)
    
  const [modalStyle] = useState(getModalStyle);

  const nav=useNavigate()
  const [rider,SetRider]=useState("");

  const handleClick = async ()=>
  {
    SetRidersShow(false)
    
  }
  const handle = async (rider_id) => {
    const response = await axois.post('http://localhost:4000/riders/order', {rider_id:rider_id,order_id:order_id})
        .catch((error) => console.log('Error: ', error));


        if(response.data=="sucessful")
        {
          SetRidersShow(false)


        }



  }

  const CustomModal = () => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showRiders}
        onClose={showRiders}
      >
        <div style={modalStyle} className={classes.paper}>
          <CloseIcon onClick={()=>handleClick()}   style={{position:"absolute",right:0,top:0}}/>
          <Typography style={{textAlign:"center"}} variant="h4" id="modal-title">
        
          #{order_id}
          </Typography>
          <Typography style={{textAlign:"center"}} variant="subtitle1" id="simple-modal-description">
         Please Select the riders from the list below
          </Typography>

          
   
   {riders.map((s) => (
  <div>
   {
s.assigned_order.length>=3  ?
null

:
<div>
<input
    style={{position:"relative",top:20}}
      type="checkbox"
      checked={rider==s._id}

    
      className="custom-control-input"
      onChange={(e)=>{

        if(e.target.checked)
        {
            SetRider(s._id)
          
            SetSubmitRider(true)
           


        }
        else
        {
            SetRider("")
            SetSubmitRider(false)
        }
      }
    
     
    
    }
  
    />

<p style={{textAlign:"center"}}>{s.name}</p>
 
 
 
  </div>
    
   }
 
 </div>
  ))}

    
    

              <Button style={{marginRight:"auto",marginLeft:"auto",display:"block"}} type="submit" variant="contained" onClick={()=>handle(rider)} disabled={!(submitRider)} >
Select Rider
</Button>     

        </div>

      </Modal>
    ) 
  };


  const classes = useStyles();

  return (


      <CustomModal />

  );
}

export default SimpleModal;