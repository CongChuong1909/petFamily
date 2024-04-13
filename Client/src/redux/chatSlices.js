import { createSlice } from '@reduxjs/toolkit';

const chatSlices = createSlice({
  name: 'chat',
  initialState: {
    listOnline: [],
  },
  reducers: {
    addList: (state, action) => {
        state.listOnline = action.payload;
      },
  },
});
export const { addList } = chatSlices.actions;
export default chatSlices.reducer;

  