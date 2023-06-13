import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "./state"
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import DashBorad from "./scenes/dashborad/index"
import Layout from './scenes/layout';

import  Login  from "./scenes/Login"

import Product from "./scenes/products/index"
const store=configureStore({
  reducer:{
    global:globalReducer
  
  }
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>


    <App /> 

     </Provider>


);

