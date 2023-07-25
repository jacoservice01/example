import { createSlice } from '@reduxjs/toolkit';

export const SettingState: any = {
  theme: "light"
};



export const settingSlice = createSlice({
  name: 'setting',
  initialState: SettingState,
  reducers: {
    //addTask: (state, action) => {
    //  state.push(action.payload);
    //},
    //addList: (state, action) =>  [...state, ...action.payload],
    //list: (state, action) =>  action.payload,
    //createUser: (state, action) => action.payload,
    modifyTheme: (state, action) => action.payload,
    resetUser: () => []
  }
});

export const {modifyTheme, resetUser } = settingSlice.actions;

export default settingSlice.reducer;
