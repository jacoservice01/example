import { Movie } from '../../models';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Movie[] = [];
/* {   id: 0,
    name: 'ruben',
    gender: 'male',
    status: 'alive',
    image: 'image',
    location: 'loc',
    species: 'human',
    type: ''
}];*/

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    addList: (state, action) =>  [...state, ...action.payload],
    list: (state, action) =>  action.payload,
    resetMovie: () => []
  }
});

export const {addList, list, resetMovie } = movieSlice.actions;

export default movieSlice.reducer;
