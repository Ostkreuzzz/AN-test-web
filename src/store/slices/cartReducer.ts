import { createSlice } from '@reduxjs/toolkit';

const getInitialCart = (): string[] => {
  const storedCartItems = localStorage.getItem('cartItems');

  return storedCartItems ? (JSON.parse(storedCartItems) as string[]) : [];
};

interface CartState {
  value: string[];
}

const initialState: CartState = {
  value: getInitialCart(),
};

const cartSlice = createSlice({
  name: 'cartStore',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.value));
    },
    remove: (state, action) => {
      state.value.splice(0, state.value.length, ...state.value.filter((item) => item !== action.payload));
      localStorage.setItem('cartItems', JSON.stringify(state.value));
    },
    deleteAll: (state) => {
      state.value.splice(0, state.value.length);
      localStorage.removeItem('cartItems');
    },
  },
});

export const { add, remove, deleteAll } = cartSlice.actions;
export default cartSlice.reducer;
