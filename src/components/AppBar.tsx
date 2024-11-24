import { AppBar, Button,  Divider,  Drawer, IconButton,  List,  ListItem,  ListItemIcon,  ListItemText,
  BottomNavigation, BottomNavigationAction} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';

import {ColorModeContext} from '../context';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { PrivateRoutes, PublicRoutes} from '../models';
import { useNavigate } from 'react-router-dom';
import { resetUser, UserKey } from '../redux/states/user';
import { clearLocalStorage } from "../utilities";
import { AppStore } from "../redux/store";

const pages = [PrivateRoutes.HOME, PrivateRoutes.DASHBOARD, PrivateRoutes.CONTACT];
const icons = [<HomeIcon/>,<DashboardIcon/>,<ContactMailIcon/>];

interface Props {
  mode: 'light' | 'dark';
}

const DrawerHeader = styled('div')((({theme}) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
})))

const drawerWidth = 241;

function AppBarMenu({ mode }: Props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const colorMode = React.useContext(ColorModeContext);

  const [open, setOpen] = useState(false);
  const userState = useSelector((store: AppStore) => store.user);
    
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    setValue(1);
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(PublicRoutes.LOGIN, { replace: true });

  };  

  return (
    
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 3}}>
        <AppBar position="fixed"  > 
          <BottomNavigation
            sx={{justifyContent: "center",}}            
            value={value}
            onChange={(event, newValue) => {
              console.log(newValue)
              setValue(newValue);
            }}>          
            <BottomNavigationAction
              sx={{ display: {xs: "flex", md: "none"} }}
              onClick={handleDrawerOpen}
              icon={<MenuIcon />}/>                 
            {
              pages.map((page, index) => (                
                userState.id===0?[]
                :
                <BottomNavigationAction
                  sx={{display: {xs: "none", md: "flex"} }}
                  label={page}
                  key={page}
                  
                  icon={icons[index]}
                  component={Link}
                  to={`/${PrivateRoutes.PRIVATE+"/"+page}`}/>
              ))
            }
            <Button
              sx={{ display: {xs: "none", md: "flex"} }}                      
              key={"page22"}
              onClick={colorMode.toggleColorMode}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </Button>
            {
              userState.id===0?[]
              :<Button
                sx={{ display: {xs: "none", md: "flex"} }}                      
                key={"page23"}
                onClick={logOut}>
                {"Exit"}
              </Button>
            }
          </BottomNavigation>
        </AppBar>
      </Box>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          },
        }}
        variant="temporary"
        anchor="left"
        onClose={() => {
          handleDrawerClose()
        }}
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <AgricultureIcon /> : <AirlineSeatFlatIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pages.map((link, index) => {
            return(
              <ListItem button
              component={Link}
              to={`/${PrivateRoutes.PRIVATE+"/"+link}`}
              key={index}>
                <ListItemIcon>
                  {index % 2 === 0 ? <AgricultureIcon /> : <AirlineSeatFlatIcon />}
                </ListItemIcon>
                <ListItemText primary={link}/>
              </ListItem>
            )
          })}
        </List>
      </Drawer>

    </>
  );
}

export default AppBarMenu;
