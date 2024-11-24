import store from './redux/store';
import { ThemeProvider} from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import React, { lazy, Suspense, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Navigate, } from 'react-router-dom';
import { RoutesWithNotFound, SnackbarUtilsConfigurator } from './utilities';
import CssBaseline from '@mui/material/CssBaseline';

import AppBarMenu from './components/AppBar';

import { createTheme} from '@mui/material';
import {ColorModeContext} from './context';
import { grey } from '@mui/material/colors';
import { PrivateRoutes, PublicRoutes} from './models';
import { AuthGuard} from './guards';


const Login = lazy(() => import('./pages/Login/Login'));
const DeleteAccount = lazy(() => import('./pages/DeleteAccount/DeleteAccount'));
const Private = lazy(() => import('./pages/Private/Private'));

export enum themePalette{
  WHITE = "#FFFFFF",
  BLACK = "#212f3c",
  FONT_GLOBAL = "'JetBrains Mono', monospace"
}

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === 'dark' && {
            background: {
              default: "#212121",
              paper: "#212121",
            },
          }),
          text: {
            ...(mode === 'light'
              ? {
                  primary: grey[900],
                  secondary: grey[800],
                }
              : {
                  primary: '#fff',
                  secondary: grey[500],
                }),
          },
        },
        typography: {
          fontFamily: themePalette.FONT_GLOBAL
        }
      }),
    [mode],
  );
  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />       
          <SnackbarProvider>            
            <SnackbarUtilsConfigurator />
            <Suspense fallback={<div>Loading...</div>}>              
              <Provider store={store}>                  
                <BrowserRouter>
                  <AppBarMenu mode={mode} />    
                  <RoutesWithNotFound>
                    <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
                    <Route path={PublicRoutes.DELETE_ACCOUNT} element={<DeleteAccount />} />
                    <Route path={PublicRoutes.LOGIN} element={<Login />} />
                    <Route element={<AuthGuard privateValidation={true} />}>
                      <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
                    </Route>                    
                  </RoutesWithNotFound>
                </BrowserRouter>
              </Provider>
            </Suspense>
          </SnackbarProvider>        
      </ThemeProvider>
    </ColorModeContext.Provider> 
  );
}
//<Route element={<RoleGuard rol={Roles.ADMIN} />}>
//<Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
//</Route>

/*
<AppBarExample mode={mode} />    
                            
                  <Routes>
                    <Route path="/" element={<Pagination />} />
                    <Route path="/pagination" element={<Pagination />} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path={`dashboard/*`} element={<DashboardSuperFix/>} />
                    <Route path="*" element={<><br/><br/><br/><br/><br/><br/>NOT FOUND</>} />
                  </Routes>
}*/


export default App;
