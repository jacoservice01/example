import { createTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from './redux/store';

//const settingState = useSelector((store: AppStore) => store.setting);
/*const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
      width: 'auto',
      height: 'auto'
    }
  }
});*/
function Theme2(){
  const settingState = useSelector((store: AppStore) => store.setting);
  const theme2 = createTheme({
    palette:{
      mode: "dark"
    }
  });
  return theme2;
}


export default Theme2;
