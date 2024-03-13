import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HouseIcon from '@mui/icons-material/House';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Stack, TextField } from '@mui/material';
import { useState } from 'react';

import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';
import { color } from '@chakra-ui/react';
import axios from 'axios';
import { json } from 'stream/consumers';
import { useNavigate } from "react-router-dom";


//design
const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);


const theme = createTheme({
  palette: {
    primary: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

const pages = ['Home', 'About', 'Services', 'Contact'];
const settings = ['Login', 'Register'];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const openRegister = () => {
    console.log("register")
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  const [isRegisterOpen, setOpenRegister] = React.useState(false);
  const [isLoginOpen, setOpenLogin] = React.useState(false);
  const [userLogin, setUserLogin] = React.useState({ email: "", password: "" });
  const [userRegister, setUserRegister] = React.useState({ email: "", password: "" , username: "", profilePic: ""});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);




  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };
  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleClickCloseRegister = () => {
    setOpenRegister(false);
  };
  const handleClickCloseLogin = () => {
    setOpenLogin(false);
  };

  const SubmitLoginEvent = async () => {
    const accessToken = await axios.post('http://localhost:3000/users/login', userLogin).then(res => res.data);
    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken.accessToken));
      setIsLoggedIn(true);
      setOpenLogin(false);

    }
  }

  const SubmitRegisterEvent = async () => {
    const data = await axios.post('http://localhost:3000/users/register', {user: {username: userRegister.username, email: userRegister.email, password: userRegister.password, profilePic: userRegister.profilePic}});
    console.log('data',data);
    // if (accessToken) {
    //   localStorage.setItem('accessToken', JSON.stringify(accessToken.accessToken));
    //   setIsLoggedIn(true);
    //   setOpenRegister(false);

    // }
  }

  const deleteToken = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  }

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);





  return (
    <AppBar position="static" sx={{ backgroundColor: "#1A1A1A", }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HouseIcon sx={{ display: { xs: 'none', md: 'flex', fontSize: 45 }, mr: 0.5 }} onClick = {()=> navigate("/home")} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'cursive',
              fontSize: 35,
              fontWeight: 700,
              letterSpacing: 2,
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick = {()=> navigate("/home")}
          >
            Homly
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <HouseIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} onClick = {()=> navigate("/home")} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'cursive',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
            onClick = {()=> navigate("/home")}
          >
            Homly
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {!isLoggedIn && <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
            <Tooltip title="Welcome">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>
                Sign In
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Login" onClick={handleClickOpenLogin}>

                <Typography textAlign="center">Login</Typography>
              </MenuItem>
              <MenuItem key="Register" onClick={handleClickOpenRegister}>

                <Typography textAlign="center">Register</Typography>
              </MenuItem>
            </Menu>

          </Box>}
          {isLoggedIn && <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>

            <MenuItem key="Logout" onClick={deleteToken}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
            <MenuItem key="Profile" onClick={() => navigate("/profile")}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
          </Box>}



        </Toolbar>
      </Container>
      <Dialog
        // Register Popup
        open={isRegisterOpen} onClose={handleClickCloseRegister} fullWidth maxWidth="sm"  >

        <DialogTitle bgcolor={'black'} color={'white'}  fontFamily={'revert'} margin={1} >User Registeration <IconButton onClick={handleClickCloseRegister} style={{ float: 'inline-start' }}></IconButton>  </DialogTitle>
        <DialogContent >
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}

          <Stack spacing={2} margin={2}>
            <TextField variant="outlined" label="Username" onChange={event => { setUserRegister(prev => { return { ...prev, username: event.target.value } })} }></TextField>
            <TextField variant="outlined" label="Password" type="Password" onChange={event => { setUserRegister(prev => { return { ...prev, password: event.target.value } })} }></TextField>
            <TextField variant="outlined" label="Email"   onChange={event => { setUserRegister(prev => { return { ...prev, email: event.target.value }})}}></TextField>
            <TextField variant="outlined" label="profilePic"   onChange={event => { setUserRegister(prev => { return { ...prev, profilePic: event.target.value }})}} ></TextField>
            <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
            <Button color="info" variant="contained"  onClick={SubmitRegisterEvent}>Submit</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
        </DialogActions>
      </Dialog>

      <Dialog
        // Login Popup
        open={isLoginOpen} onClose={handleClickCloseLogin} fullWidth maxWidth="sm">

        <DialogTitle bgcolor={'lightskyblue'} color={'white'} fontFamily={'revert'} margin={1} >User Login  <IconButton onClick={handleClickCloseLogin} style={{ float: 'right' }}></IconButton>  </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
          <Stack spacing={2} margin={2}>
            <TextField variant="outlined" label="Email" onChange={event => { setUserLogin(prev => { return { ...prev, email: event.target.value } }) }}> </TextField>
            <TextField variant="outlined" label="Password" type="Password" onChange={event => { setUserLogin(prev => { return { ...prev, password: event.target.value } }) }}></TextField>
            <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Stay Logged In"></FormControlLabel>
            <Button color="primary" variant="contained" onClick={SubmitLoginEvent}>Submit</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
        </DialogActions>
      </Dialog>

    </AppBar>
  );
}
export default ResponsiveAppBar;
