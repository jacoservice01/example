import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './states/user';
import { characterSlice} from './states/character';
import { settingSlice } from './states/setting';
import { movieSlice } from './states/movie';


export interface AppStore {
  user: any;
  character: any;
  setting: any;
  movie: any;
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    character: characterSlice.reducer,
    setting: settingSlice.reducer,
    movie: movieSlice.reducer
  }
});
