import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetSales = createAsyncThunk(
  'API/GetSales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/sales/sales');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetOrdersDetails = createAsyncThunk(
  'API/GetOrdersDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/order/riders/orders/details');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetRiders = createAsyncThunk(
  'API/GetRiders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/riders');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetCustomers = createAsyncThunk(
  'API/GetCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/customers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetGeneral = createAsyncThunk(
  'API/GetGeneral',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/general');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetTransaction = createAsyncThunk(
  'API/GetTransaction',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/transaction');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetOrderDetails = createAsyncThunk(
  'API/GetOrderDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/order/get/orders/product');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/users', { username, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const GetRidersRoutesOrders = createAsyncThunk(
  'API/GetRidersRoutesOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/order/riders/routes/orders');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStarters = createAsyncThunk(
  'API/fetchStarters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/order/get/starters');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Breakfast
export const fetchBreakfast = createAsyncThunk(
  'API/fetchBreakfast',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/order/get/breakfast');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Lunch
export const fetchLunch = createAsyncThunk(
  'API/fetchLunch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/order/get/lunch');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Dinner
export const fetchDinner = createAsyncThunk(
  'API/fetchDinner',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/order/get/dinner');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Dessert
export const fetchDessert = createAsyncThunk(
  'API/fetchDessert',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/order/get/dessert');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Beverage
export const fetchBeverage = createAsyncThunk(
  'API/fetchBeverage',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/order/get/beverage');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addRider = createAsyncThunk(
  'riders/addRider',
  async ({ name, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/riders/add', { name, email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderDetailsById = createAsyncThunk(
  'orders/fetchOrderDetailsById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/order/get/orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadFile = createAsyncThunk(
  'order/uploadFile',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("http://localhost:4000/order/upload", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async ({ name, cat, price, cost_price, img }) => {
    const imgUrl = img ? await uploadFile(img) : "";
    const response = await axios.post('http://localhost:4000/order/', {
      name,
      price,
      cost_price,
      cat,
      img: imgUrl,
    });
    return response.data;
  }
);
export const handleRiderOrder = createAsyncThunk(
  'riders/handleRiderOrder',
  async ({ rider_id, order_id }) => {
    const response = await axios.post('http://localhost:4000/riders/order', { rider_id, order_id });
    return response.data;
  }
);

export const editOrder = createAsyncThunk(
  'order/editOrder',
  async ({ Id, ProductName, ProductPrice, ProductCostPrice, ProductCat, imgUrl }) => {
    try {
      const response = await axios.post(`http://localhost:4000/order/edit/order/${Id}`, {
        name: ProductName,
        price: ProductPrice,
        cost_price: ProductCostPrice,
        cat: ProductCat,
        img: imgUrl
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (name) => {
    try {
      const response = await axios.delete(`http://localhost:4000/order/delete/order/${name}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
export const APISlice = createSlice({
  name: 'API',
  initialState: { data: [], error: null, status: 'idle', verifiedStatus: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(GetSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(GetOrdersDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetOrdersDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(GetOrdersDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(GetRiders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetRiders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(GetRiders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(GetCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(GetCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(GetGeneral.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetGeneral.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(GetGeneral.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(GetTransaction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetTransaction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(GetTransaction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(GetOrderDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetOrderDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(GetOrderDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(GetRidersRoutesOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetRidersRoutesOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(GetRidersRoutesOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      builder
      .addCase(fetchStarters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStarters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchStarters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchBreakfast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBreakfast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchBreakfast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchLunch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLunch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchLunch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchDinner.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDinner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDinner.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchDessert.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDessert.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDessert.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchBeverage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBeverage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchBeverage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addRider.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addRider.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(addRider.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchOrderDetailsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderDetailsById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderDetailsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(uploadFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(handleRiderOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleRiderOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(handleRiderOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default APISlice.reducer;
