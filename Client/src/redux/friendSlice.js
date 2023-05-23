import { createSlice } from '@reduxjs/toolkit';

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    friendId: null,
    error: null,
  },
  reducers: {
    addFriendSuccess: (state, action) => {
        state.friendId = action.payload;
        state.error = null;
      },
      addFriendFailure: (state, action) => {
        state.friendId = null;
        state.error = action.payload;
      },
  },
});
export const { addFriendSuccess, addFriendFailure } = friendSlice.actions;
export default friendSlice.reducer;

  