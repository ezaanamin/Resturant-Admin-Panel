import React from "react";

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

function SimpleModal({heading}) {

    const {    modalShow,SetModalShow    }=useContext(UserContext)
    
  const [modalStyle] = useState(getModalStyle);


  const handleClick = async ()=>
  {
    SetModalShow(false)
    
  }


  const ModalStatus = () => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalShow}
        onClose={modalShow}
      >
        <div style={modalStyle} className={classes.paper}>
          <CloseIcon onClick={()=>handleClick()}   style={{position:"absolute",right:0,top:0}}/>
      
          <Typography style={{textAlign:"center"}} variant="subtitle1" id="simple-modal-description">
       {heading}
          </Typography>
 

        </div>

      </Modal>
    ) 
  };


  const classes = useStyles();

  return (


      <ModalStatus/>

  );
}

export default SimpleModal;