import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import AddIcon from '@mui/icons-material/Add';
import homeAvatar from '../assets/homeAvatar.png'

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HouseIcon from '@mui/icons-material/House';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Fab, FormControlLabel, Stack, TextField } from '@mui/material';



import axios from 'axios';

import { useNavigate } from "react-router-dom";
import { uploadPhoto } from '../services/file-service';
// import { googleSignIn } from '../services/user-service';

import avatar from '../assets/avatar.png'
import { CredentialResponse,   GoogleLogin, googleLogout } from '@react-oauth/google';










const pages = [];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const fileInputRef2 = React.useRef<HTMLInputElement>(null)

  const [isRegisterOpen, setOpenRegister] = React.useState(false);
  const [isLoginOpen, setOpenLogin] = React.useState(false);
  const [userLogin, setUserLogin] = React.useState({ email: "", password: "" });
  const [userRegister, setUserRegister] = React.useState({ email: "", password: "", name: "", fileName: "avatar.png" });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState<File>();
  const [alertPop, setAlertPop] = React.useState(false);
  const [loginAlert, setLoginAlert] = React.useState(false);


  const [isAddAssetOpen, setOpenAddAsset] = React.useState(false);
  const [addAssetToUser, setAsset] = React.useState({ address: "", price: "", fileName: "homeAvatar.png" });

  const [textVal, setTextVal] = React.useState(
    {
      name:
      {
        message: "",
        error: false
      },
      email: {
        message: "",
        error: false
      },
      password: {
        message: "",
        error: false
      }
    }
  );


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickOpenAddAsset = () => {
    setOpenAddAsset(true);
  }
  const handleClickCloseAddAsset = () => {
    setOpenAddAsset(false);
  }


  const handleClickOpenRegister = () => {
    setOpenRegister(true);
    setAnchorElUser(null);
  };


  const handleClickOpenLogin = () => {
    setOpenLogin(true);
    setAnchorElUser(null);
  };
  const handleClickCloseRegister = () => {
    setOpenRegister(false);
  };
  const handleClickCloseLogin = () => {
    setOpenLogin(false);
    setLoginAlert(false);
  };

  const SubmitLoginEvent = async () => {
    const response = await axios.post('http://node42.cs.colman.ac.il:4002/users/login', userLogin).catch(err => {
      // check if 401
      if (err.response.status === 401) {
        setLoginAlert(true);
        console.log(loginAlert);
        return;
      }
    });

    if (response) {
      localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
      setIsLoggedIn(true);
      setOpenLogin(false);
      setLoginAlert(false);

    }
  }

  const SubmitRegisterEvent = async () => {
    if (!textVal.email.error && !textVal.name.error && !textVal.password.error) {
      try {
        await uploadPhoto(imgSrc!);
      } catch (error) {
        console.log(error);
      }
      // console.log(url);
      await axios.post('http://node42.cs.colman.ac.il:4002/users/register', { user: userRegister }).then(res => res.data);
      // setIsLoggedIn(true
      setOpenRegister(false);
      setAlertPop(true);
      setTimeout(() => {
        navigate(0);
      }, 2000);
    }
  }

  const addAsset = async () => {

    await uploadPhoto(imgSrc!);
    const response = await axios.post('http://node42.cs.colman.ac.il:4002/assets/addAsset', { asset: addAssetToUser }).then(res => res.data);  // creat asset

    const asset_id = await response._id;

    const user_id = await axios.get('http://node42.cs.colman.ac.il:4002/users/info', {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('accessToken'))
      }
    }).then(res => res.data);  // get user id


    const user = await user_id._id;
    const body = {
      "asset": asset_id,
      "id": user
    }
    await axios.post('http://node42.cs.colman.ac.il:4002/users/addAssetToUser/', body).then(res => res.data);  // add asset to user
    setOpenAddAsset(false);
    setTimeout(() => {
      navigate(0);
    }, 100);


  }




  const imgSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0])
      setUserRegister(prev => { return { ...prev, fileName: e.target.files[0].name } })
    }
  }


  const imgSelected2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0])
      setAsset(prev => { return { ...prev, fileName: e.target.files[0].name } })
    }
  }



  const selectImg = () => {   //register
    console.log("Selecting image...")
    fileInputRef.current?.click()
  }


  const selectImg2 = () => {
    console.log("Selecting image...")
    fileInputRef2.current?.click()
  }

  const deleteToken = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    
    navigate("/");
  }

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);



  const validateEmail = (event,) => {
    if (!event.target.value.includes('@')) {
      setTextVal(prev => { return { ...prev, email: { message: "Email is incorrect", error: true } } })
    } else {
      setTextVal(prev => { return { ...prev, email: { message: "", error: false } } })
      setUserRegister(prev => { return { ...prev, email: event.target.value } })
    }
  }

  const validateUserName = (event,) => {
    if (event.target.value.includes(' ')) {
      setTextVal(prev => { return { ...prev, name: { message: "Username must not contain spaces", error: true } } })
    } else {
      setTextVal(prev => { return { ...prev, name: { message: "", error: false } } })
      setUserRegister(prev => { return { ...prev, name: event.target.value } })
    }
  }



  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse & { email: string }) => {
    const response = await axios.post('http://node42.cs.colman.ac.il:4002/users/google', credentialResponse);
    if (response) {
      localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
      setIsLoggedIn(true);
      setOpenLogin(false);
      setLoginAlert(false);

     
  }
  }

  function onGoogleLoginError(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1A1A1A", padding:'1vh' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HouseIcon sx={{ display: { xs: 'none', md: 'flex', fontSize: 45 }, mr: 0.5 }} onClick={() => navigate("/home")} />
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
            onClick={() => navigate("/")}
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
          <HouseIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} onClick={() => navigate("/home")} />
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
            onClick={() => navigate("/")}
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
              sx={{ mt: '45px', paddingRight: 3}}
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
              <MenuItem key="Login" onClick={handleClickOpenLogin} >
                <Typography textAlign="center">Login<Typography fontSize={11}>or login with google </Typography>  </Typography>
               
              </MenuItem>
              <MenuItem key="Register" onClick={handleClickOpenRegister}>

                <Typography textAlign="center" paddingLeft={2}>Register</Typography>
              </MenuItem>

              {/* <MenuItem key="Register" onClick={()=> navigate("/registeration")}>

                <Typography textAlign="center">Register</Typography>
              </MenuItem> */}
            </Menu>

          </Box>}

          {isLoggedIn && <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>

            <Tooltip title="Add Asset" onClick={handleClickOpenAddAsset}>
              <MenuItem key="Add">
                <Fab size="medium" color="primary" aria-label="add" >
                  <AddIcon></AddIcon>

                </Fab>
              </MenuItem>
            </Tooltip>



            <MenuItem key="Profile" onClick={() => navigate("/profile")}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>

            <MenuItem key="Logout" onClick={deleteToken}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>

          </Box>}



        </Toolbar>
      </Container>

      <Dialog
        // Add Asset Popup
        open={isAddAssetOpen} onClose={handleClickCloseAddAsset} fullWidth maxWidth="sm"  >
        <DialogTitle bgcolor={'black'} color={'white'} fontFamily={'revert'} margin={1} >Add Asset<IconButton onClick={handleClickCloseAddAsset} style={{ float: 'inline-start' }}></IconButton>  </DialogTitle>
        <DialogContent >
          <Stack spacing={2} margin={2}>
            <Box display={"flex"} justifyContent={'center'}>
              <img alt="imageBroken" src={imgSrc ? URL.createObjectURL(imgSrc) : homeAvatar} style={{ height: "250px", width: "350px" }} className="img-fluid" />
            </Box>
            <input style={{ display: "none" }} ref={fileInputRef2} type="file" onChange={imgSelected2}></input>
            <Button color="info" variant="contained" onClick={selectImg2}>Upload Asset Image</Button>
            <TextField variant="outlined" label="Address" onChange={event => { setAsset(prev => { return { ...prev, address: event.target.value } }) }}></TextField>
            <TextField variant="outlined" label="Price" onChange={event => { setAsset(prev => { return { ...prev, price: event.target.value } }) }}></TextField>
            <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
            <Button color="info" variant="contained" onClick={addAsset}>Submit</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>


      <Dialog
        // Register Popup
        open={isRegisterOpen} onClose={handleClickCloseRegister} fullWidth maxWidth="sm"  >

        <DialogTitle bgcolor={'black'} color={'white'} fontFamily={'revert'} margin={1} >User Registeration <IconButton onClick={handleClickCloseRegister} style={{ float: 'inline-start' }}></IconButton>  </DialogTitle>
        <DialogContent >

          <Stack spacing={2} margin={2}>
            <Box display={"flex"} justifyContent={'center'}>
              <img alt="imageBroken" src={imgSrc ? URL.createObjectURL(imgSrc) : avatar} style={{ height: "250px", width: "250px" }} className="img-fluid" />
            </Box>
            <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>
            <Button color="info" variant="contained" onClick={selectImg}>Upload Profile Image</Button>

            <TextField variant="outlined" label="Username" error={textVal.name.error} helperText={textVal.name.message} onChange={(event) => validateUserName(event)}></TextField>
            <TextField variant="outlined" label="Password" type="Password" onChange={event => { setUserRegister(prev => { return { ...prev, password: event.target.value } }) }}></TextField>
            <TextField variant="outlined" error={textVal.email.error} helperText={textVal.email.message} label="Email" onChange={(event) => validateEmail(event)}></TextField>

            <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
           
            <Button color="info" variant="contained" onClick={SubmitRegisterEvent} >Submit</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      <Collapse in={alertPop}>
        <Alert variant="filled" severity="success">
          Registerd successfully. Please login to continue.
        </Alert>
      </Collapse>

      <Dialog
        // Login Popup
        open={isLoginOpen} onClose={handleClickCloseLogin} fullWidth maxWidth="sm">

        <DialogTitle bgcolor={'lightskyblue'} color={'white'} fontFamily={'revert'} margin={1} >User Login  <IconButton onClick={handleClickCloseLogin} style={{ float: 'right' }}></IconButton>  </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
    
            <TextField variant="outlined" label="Email" onChange={event => { setUserLogin(prev => {return { ...prev, email: event.target.value } }) }}> </TextField>
            <TextField variant="outlined" label="Password" type="Password" onChange={event => { setUserLogin(prev => { return { ...prev, password: event.target.value } }) }}></TextField>
            <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Stay Logged In"></FormControlLabel>
            <Collapse  in={loginAlert}>
              <div style={{justifyContent: "center", alignItems:"center", display: "flex", color: "red"}}>
                <div>User and password incorrect</div>
              </div>
            </Collapse>

   

            <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginError} size='large'/>
           
            <Button color="primary" variant="contained" onClick={SubmitLoginEvent} >Submit</Button>
          </Stack>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>

    </AppBar>
  );
}
export default ResponsiveAppBar;
