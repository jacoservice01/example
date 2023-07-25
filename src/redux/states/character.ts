import { Character } from '../../models';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Character[] = [];
/* {   id: 0,
    name: 'ruben',
    gender: 'male',
    status: 'alive',
    image: 'image',
    location: 'loc',
    species: 'human',
    type: ''
}];*/

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    //addTask: (state, action) => {
    //  state.push(action.payload);
    //},
    addList: (state, action) =>  [...state, ...action.payload],
    list: (state, action) =>  action.payload,
    //createUser: (state, action) => action.payload,
    //modifyUser: (state, action) => ({ ...state, ...action.payload }),
    resetCharacter: () => []
  }
});

export const {addList, list, resetCharacter } = characterSlice.actions;

export default characterSlice.reducer;
