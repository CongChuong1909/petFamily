import { createSlice } from '@reduxjs/toolkit';

const relationshipSlices = createSlice({
  name: 'relationship',
  initialState: {
    list:{},
  },
  reducers: {
    getAll: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { getAll} = relationshipSlices.actions;
export default relationshipSlices.reducer;