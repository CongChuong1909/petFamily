import { createSlice } from '@reduxjs/toolkit';

const modalSlices = createSlice({
  name: 'modal',
  initialState: {
    showModalOpitonComment: true,
  },
  reducers: {
    closeModalOptionComment: (state) => {
      state.showModalOpitonComment = false;
    },
    openModalOptionComment: (state) => {
        state.showModalOpitonComment = true;
      },
  },
});

export const { closeModalOptionComment, openModalOptionComment } = modalSlices.actions;
export default modalSlices.reducer;