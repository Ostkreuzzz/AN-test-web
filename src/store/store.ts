import { configureStore, combineSlices } from '@reduxjs/toolkit';
import bookmarkSlice from './slices/bookmarkReducer';
import cartSlice from './slices/cartReducer';
import messageSlice from './slices/messageReducer';

const rootReducer = combineSlices({
  bookmarkStore: bookmarkSlice,
  cartStore: cartSlice,
  messageStore: messageSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
