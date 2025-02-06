import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '@interfaces/Message';

const initialState: Message = {
  type: 'success',
  text: '',
  isMessage: false,
};

const messageSlice = createSlice({
  name: 'MessageStore',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<Message>) => {
      state.type = action.payload.type;
      state.isMessage = action.payload.isMessage;
      state.text = action.payload.text;
    },
    unsetMessage: (state) => {
      state.type = 'success';
      state.text = '';
      state.isMessage = false;
    },
  },
});

export const { setMessage, unsetMessage } = messageSlice.actions;
export default messageSlice.reducer;
