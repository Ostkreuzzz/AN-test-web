import { createSlice } from '@reduxjs/toolkit';

const getInitialBookmarks = (): string[] => {
  const storedBookmarks = localStorage.getItem('bookmarks');

  return storedBookmarks ? (JSON.parse(storedBookmarks) as string[]) : [];
};

interface BookmarkState {
  value: string[];
}

const initialState: BookmarkState = {
  value: getInitialBookmarks(),
};

const bookmarkSlice = createSlice({
  name: 'bookmarkStore',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload as string);
      localStorage.setItem('bookmarks', JSON.stringify(state.value));
    },
    remove: (state, action) => {
      state.value.splice(0, state.value.length, ...state.value.filter((item) => item !== action.payload));
      localStorage.setItem('bookmarks', JSON.stringify(state.value));
    },
    deleteAll: (state) => {
      state.value.splice(0, state.value.length);
      localStorage.removeItem('bookmarks');
    },
  },
});

export const { add, remove, deleteAll } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
