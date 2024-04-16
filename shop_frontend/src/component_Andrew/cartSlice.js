// Create a new file named cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    shippingAddress: null,
    paymentMethod: null,
  },
  reducers: {
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const { saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;
