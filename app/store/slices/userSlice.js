import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userList: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userList.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.userList.findIndex(user => user.id === id);
      if (index !== -1) state.userList[index] = updatedData;
    },
    deleteUser: (state, action) => {
      state.userList = state.userList.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
