import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Grid, Box , Fab, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Tooltip} from "@mui/material";
import Navbar from "../components/NavBar";
import LoadingSpinner from "../components/LoadingSpinner";

import Property from "../components/Property";
import EditIcon from '@mui/icons-material/Edit';
import avatar from '../assets/avatar.png'
import MenuItem from '@mui/material/MenuItem';
import { uploadPhoto } from '../services/file-service';
import axios from 'axios';


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [assets, setAsset] = useState([]);

  const [isEditUserOpen, setOpenEditUser] = React.useState(false);
  const [editUser, setEditUser] = React.useState({ email: "", password: "", name: "", fileName: ""  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = React.useState<File>();


  useEffect(() => {

    // const fetchUserData = async () => {
    //   const response = await axios.get('http://node42.cs.colman.ac.il:4001/users/info', {
    //     headers: {
    //       'Authorization': JSON.parse(localStorage.getItem('accessToken'))
    //   }}).then(res => res.data);     
    //   setUser(response);
    // }
    const fetchData = async () => {
      try {
        const response = await fetch('http://node42.cs.colman.ac.il:4001/users/info', {
          headers: {
            'Authorization': JSON.parse(localStorage.getItem('accessToken'))
          },
          mode: 'cors',
        });
        const userdata = await response.json();
        console.log("1", userdata.assets);
        userdata.assets.forEach((asset) => {
          fetchAssetData(asset);

        });
        setUser(userdata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


    const fetchAssetData = async (assetId: string) => {
      try {
        const response = await fetch('http://node42.cs.colman.ac.il:4001/assets/' + assetId, {
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
        });
        const asset = await response.json();
        console.log("3", asset);
        setAsset(prev => [...prev, asset]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  }, []);

  const handleClickOpenEditUser = () => {
    setOpenEditUser(true);
  }
  const handleClickCloseEditUser = () => {
    setOpenEditUser(false);
  }

  const imgSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0])
      setEditUser(prev => { return { ...prev, fileName: e.target.files[0].name } })
     
    }
  }
  const selectImg = () => {
    console.log("Selecting image...")
    fileInputRef.current?.click()
  }




  const submitEditUser = async () => {


    await uploadPhoto(imgSrc!);

    await axios.put('http://node42.cs.colman.ac.il:4001/users/' + user._id, { user: editUser}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('accessToken'))
      }
    }).then(response => {
      console.log(response);
      window.location.reload();
    }
    ).catch(error => {
      console.error('Error fetching data:', error);
    });

  }

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/old-cement-wall-texture_1149-1280.jpg)', backgroundPosition: 'center', height: '100vh'}} >
      <Navbar />

      <Grid container
        justifyContent="center"  >

        <Grid item xs={12} container justifyContent="center" alignItems="center" bgcolor={'Highlight'} >
          <Typography variant="h3" align="center" gutterBottom fontFamily={'cursive'} paddingTop={2} >
            User Profile
          </Typography>
        </Grid>

     

     


        <Grid container maxWidth={'70rem'} justifyContent={'center'} alignItems={'center'} display={'flex'}>
          
          <Grid item xs={6} container direction="row" alignItems='baseline'  paddingTop={4}>
            
            <Card >
              <CardContent >
                <Typography variant="h6" gutterBottom align="center" fontFamily={'unset'} bgcolor={'Highlight'}>
                  Profile Picture
                </Typography>
                <img src={`http://node42.cs.colman.ac.il:4001/file?file=${user.fileName}`} alt="" style={{ height: "250px", width: "450px" }} />
              </CardContent>
            </Card>
          </Grid>
          



          <Grid item xs={6} justifyContent="center" alignItems="center" >
            <Grid item xs={12} container justifyContent={'right'}paddingBottom={4} >

            <Tooltip title="Edit User Details"  onClick={handleClickOpenEditUser} >
          <MenuItem key="Add" >
            <Fab size="medium" color="primary" aria-label="add" >
             <EditIcon></EditIcon>
            </Fab>
          </MenuItem>
        </Tooltip>

            </Grid>


  
              <Grid paddingBottom={5} >
                <Card >
                  <CardContent>
                  <Typography variant="h5" gutterBottom fontFamily={'unset'} bgcolor={'Highlight'} textAlign={'center'} >
                  User Name
                </Typography>
                <Typography variant="body2" fontSize={20} textAlign={'center'} fontStyle={'oblique'}>
                  {user.name}
                </Typography>
                  </CardContent>
                </Card>
              </Grid>
       
          



       
            <Card >
              <CardContent >
                <Typography variant="h5" gutterBottom fontFamily={'unset'} bgcolor={'Highlight'} textAlign={'center'}>
                  Email
                </Typography>
                <Typography  variant="body2" fontSize={20} textAlign={'center'} fontStyle={'oblique'}>{user.email}</Typography>
              </CardContent>
            </Card>
            </Grid>


          <Typography gutterBottom variant="h3" align="center" fontFamily={'cursive'} paddingTop={2} bgcolor={'highlight'} margin={5}>
            User Assets
          </Typography>
          <Grid item xs={12} container justifyContent="center" alignItems="center" >
            <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} maxWidth={'60rem'}>
              {assets && assets.length > 0 ? assets.map((asset) =>
                <Property asset={asset} key={asset._id} />) :    <Typography gutterBottom variant="h5" align="center" fontFamily={'cursive'}  margin={5}>No Assets</Typography>}
            </Box>
          </Grid>

        </Grid>


      </Grid>

      <Dialog
        // Edit User Profile
        open={isEditUserOpen} onClose={handleClickCloseEditUser} fullWidth maxWidth="sm"  >
        <DialogTitle bgcolor={'black'} color={'white'} fontFamily={'revert'} margin={1} >Add Asset<IconButton onClick={handleClickCloseEditUser} style={{ float: 'inline-start' }}></IconButton>  </DialogTitle>
        <DialogContent >
          <Stack spacing={2} margin={2}>
            <Box display={"flex"} justifyContent={'center'}>
              <img alt="imageBroken" src={imgSrc ? URL.createObjectURL(imgSrc) : avatar} style={{ height: "250px", width: "250px" }} className="img-fluid" />
            </Box>
      
            <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>
            <Button color="info" variant="contained" onClick={selectImg}>Upload New Profile Image</Button>
            <TextField variant="outlined" label="Username" onChange={event => { setEditUser(prev => { return { ...prev, name: event.target.value } }) }}></TextField>
            <TextField variant="outlined" label="Password" type="Password" onChange={event => { setEditUser(prev => { return { ...prev, password: event.target.value } }) }}></TextField>
            <TextField variant="outlined" label="Email" onChange={event => { setEditUser(prev => { return { ...prev, email: event.target.value } }) }}></TextField>
            <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
            <Button color="info" variant="contained" onClick={submitEditUser}>Submit</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>





    </div>
  );
};

export default UserProfile;


