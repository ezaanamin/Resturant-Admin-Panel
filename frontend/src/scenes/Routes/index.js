import DashBorad from '../../scenes/dashborad/index';
import Layout from '../../scenes/layout/index';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
import  Login  from "../Login/index"
import Customers from '../../scenes/customers/index'
import Product from "../products/index"
import Transaction from "../../scenes/transaction/index"
import Orders from '../../scenes/orders/index';
import OverAllStats from '../OverallStats/index';
import Daily from '../daily/index';
import Monthly from '../monthly';
import BreakDown from '../breakdown';
import Rider from '../riders';
import EditProducts from '../products/EditProduct';
import DeleteProduct from '../products/DeleteProduct';
import PendingOrders from '../PendingOrders';
import DeliveredOrders from '../DelievedOrders';
import io from "socket.io-client"
import ModalStatus from "../../components/ModalStatus"
import { UserContext } from '../../context/context';
import { useContext } from 'react'

import { useState } from 'react';
import OnRoute from '../On Route';
import AssignOrders from '../AssignOrders';

const socket=io.connect("http://localhost:4000/");




function Routes(){


  const [StatusData,SetStatusData]=useState([])
  const {statusShow,SetStatusShow}=useContext(UserContext)


  socket.on('statusChanged', data => {


    console.log(data.id,'ezaan amin')
    SetStatusData(data)
    SetStatusShow(true)

  });

  const router = createBrowserRouter([
    {
      path: "/dashborad",
      element: (
        <div>   
        <Layout/>
       <DashBorad/>
       <ModalStatus id={StatusData.id} status={StatusData.status}/>
    
  
        </div>
      ),
    },
    {
      path: "/",
      element: (
        <div>
        <Login/>
  
        </div>
      ),
    },
    {
      path: "/products",
      element: <div>
    <Layout/>
        <Product/>
        <ModalStatus id={StatusData.id} status={StatusData.status}/>
      
      </div>,
    },
    {
      path:"/customers",
      element:
      <div> 
        <Layout/>
        <Customers/>
        <ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
    },
    {
      path:"/transactions",
      element:
      <div>
        <Layout/>
  <Transaction/>
  <ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
    }
    ,
    {
      path:"/ all orders",
      element:
      <div>
    <Layout/>
  <Orders/>
  <ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
    },
    {
      path:"/ pending orders",
      element:
      <div>
    <Layout/>
  <PendingOrders/>
  <ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
    }
    ,
    {
      path:"/delivered orders",
      element:
      <div>
    <Layout/>
  <DeliveredOrders/>
  <ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>


    },

    {
      path:"/on route",
      element:
      <div>
    <Layout/>
  <OnRoute/>
  <ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
      

    },
    {
      path:"/assignorders",
      element:
      <div>
    <Layout/>
  <AssignOrders/>
  <ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
      

    },


    {
      path:"/overview",
      element:
      <div>
    <Layout/>
  <OverAllStats/>
  <ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
    }
    ,
    {
      path:"/daily",
      element:
      <div>
    <Layout/>
  <Daily/>
  <ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
    },
    {


      path:"/monthly",
      element:
      <div>
<Layout/>
<Monthly/>
<ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
    },
    {


      path:"/breakdown",
      element:
      <div>
<Layout/>
<BreakDown/>
<ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
    },
    {


      path:"/rider",
      element:
      <div>
<Layout/>
<Rider/>
<ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
    },
    {
      path:"/edit/:id",
      element:
      <div>
        <EditProducts/>
        <ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
    },
    {
      path:"/delete/:id",
      element:
      <div>
        <DeleteProduct/>
        <ModalStatus id={StatusData.id} status={StatusData.status}/>
      </div>
    }
  ]);



    return(

        <RouterProvider router={router} />

    )

}


export default Routes