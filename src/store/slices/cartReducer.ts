import { createSlice } from '@reduxjs/toolkit';
import { FlightSeat } from '@interfaces/Flight';

const getInitialCart = () => {
  const storedCartItems = localStorage.getItem('cartItems');

  return storedCartItems ? (JSON.parse(storedCartItems) as FlightSeat[]) : [];
};

const initialState = {
  value: getInitialCart(),
};

const cartSlice = createSlice({
  name: 'cartStore',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.value.push(action.payload as FlightSeat);
      localStorage.setItem('cartItems', JSON.stringify(state.value));
    },
    removeFromCart: (state, action) => {
      state.value.splice(
        0,
        state.value.length,
        ...state.value.filter((item) => item.flightId !== action.payload.flightId),
      );
      localStorage.setItem('cartItems', JSON.stringify(state.value));
    },
    deleteAllCart: (state) => {
      state.value.splice(0, state.value.length);
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, deleteAllCart } = cartSlice.actions;
export default cartSlice.reducer;
