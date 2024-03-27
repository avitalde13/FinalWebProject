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
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { color } from "framer-motion";

import homeAvatar from '../assets/homeAvatar.png';
import ModeEditIcon from '@mui/icons-material/ModeEdit';





const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [assets, setAsset] = useState([]);
  const navigate = useNavigate();

  const [isEditUserOpen, setOpenEditUser] = React.useState(false);
  const [editUser, setEditUser] = React.useState({ email: "", password: "", name: "", fileName: ""  });
const [editAsset, setEditAsset] = React.useState({ address: "", price: "", fileName: "" });
const [isEditAssetOpen, setOpenEditAsset] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = React.useState<File>();


  useEffect(() => {
    fetchData();

    }, []);

  const fetchData = async  () => {
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

  const fetchAssetData = async (assetId) => {
    try {
      const response = await fetch('http://node42.cs.colman.ac.il:4001/assets/' + assetId, {
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
      });
      console.log("2", response);
      const asset = await response.json();
      console.log("3", asset);
      setAsset(prev => [...prev, asset]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClickOpenEditUser = () => {
    setOpenEditUser(true);
  }
  const handleClickCloseEditUser = () => {
    setOpenEditUser(false);
  }
 const handleClickOpenEditAsset = () => {
  setOpenEditAsset(true);
}
  const  handleClickCloseEditAsset = () => {
    setOpenEditAsset(false);
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


  const deleteAsset = async (assetId: String) => {
    try{
      const response = await fetch('http://node42.cs.colman.ac.il:4001/assets?assetId=' + assetId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
      });
      const data = await response.json();
      setAsset(assets.filter(asset => asset._id !== assetId));

  
    }catch(error){  
      console.error('Error fetching data:', error);
    }

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



  const editAssetDetails =  async (asset_id) => {
    await uploadPhoto(imgSrc!);
    const assetId =  assets.filter((asset)=> asset._id === asset_id);

if (assetId == asset_id){
    const response = await axios.put('http://node42.cs.colman.ac.il:4001/assets?assetId=' + assetId,  {  asset: editAsset } )
    console.log(response);
}


    // .then(response => {
    //   console.log(response);
    //   window.location.reload();
    // }).catch(error => {
    //   console.error('Error fetching data:', error);
    // });



  }

  return (
    <div style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/old-cement-wall-texture_1149-1280.jpg)', backgroundPosition: 'center', minHeight:'85rem'}} >
      <Navbar />

      <Grid container
        justifyContent="center"  >

        <Grid item xs={12} container justifyContent="center" alignItems="center" >
          <Typography variant="h3" align="center" gutterBottom fontFamily={'cursive'} paddingTop={2}  >
            User Profile
          </Typography>
        </Grid>

     

     


        <Grid container maxWidth={'60rem'} justifyContent={'center'} alignItems={'center'} display={'flex'} >
          
          <Grid item xs={6} container direction="row" alignItems='baseline'  paddingTop={2}>
            
            <Card  style={{backgroundColor: 'lightgray'}}>
              <CardContent >
                <Typography variant="h5" gutterBottom align="center" fontFamily={'serif'} bgcolor={'grey'}>
                  Profile Picture
                </Typography>
                <img src={`http://node42.cs.colman.ac.il:4001/file?file=${user.fileName}`} alt="" style={{ height: "250px", width: "350px" }} />
              </CardContent>
            </Card>
          </Grid>
          



          <Grid item xs={6} justifyContent="center" alignItems="center" >
            <Grid item xs={12} container justifyContent={'right'}paddingBottom={3} >

            <Tooltip title="Edit User Details"  onClick={handleClickOpenEditUser} >
          <MenuItem key="Add" >
            <Fab size="medium" aria-label="add" color="warning" >
             <EditIcon></EditIcon>
            </Fab>
          </MenuItem>
        </Tooltip>

            </Grid>


  
              <Grid paddingBottom={5} >
                <Card  style={{backgroundColor: 'lightgray'}}>
                  <CardContent>
                  <Typography variant="h5" gutterBottom  fontFamily={'serif'} bgcolor={'grey'} textAlign={'center'} >
                  User Name
                </Typography>
                <Typography variant="body2" fontSize={20} textAlign={'center'} fontStyle={'oblique'}>
                  {user.name}
                </Typography>
                  </CardContent>
                </Card>
              </Grid>
          
            <Card style={{backgroundColor: 'lightgray'}}>
              <CardContent >
                <Typography variant="h5" gutterBottom fontFamily={'serif'}bgcolor={'grey'} textAlign={'center'}>
                  Email
                </Typography>
                <Typography  variant="body2" fontSize={20} textAlign={'center'} fontStyle={'oblique'}>{user.email}</Typography>
              </CardContent>
            </Card>

            
            </Grid>


          <Typography gutterBottom variant="h3" align="center" fontFamily={'cursive'}  marginTop={'5vh'}>
            User Assets
          </Typography>



        </Grid>


      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    
    padding={3}


      direction="row"
      justifyContent="center"
      alignItems="center"
>
            {/* <Box display={'flex'} justifyContent={'center'}  alignItems={'center'} maxWidth={'100%'} > */}
              
              {assets && assets.length > 0 ? assets.map((asset) =>
            <Card style={{display:"flex", flexDirection:"column", margin:"1rem", minWidth:'15%', minHeight:'30%',  backgroundColor:"lightgray"}}>  
            <Property asset={asset} key={asset._id} />  <div style={{display:"flex", justifyContent:"center"}}>

            <Tooltip title="Edit User Details"  onClick={handleClickOpenEditAsset} >
            <Button color="success" variant="contained" style={{width: "100%"}} onClick={handleClickOpenEditAsset}><ModeEditIcon onClick={handleClickOpenEditAsset}/></Button>
            </Tooltip>

            
              <Button color="error" variant="contained" style={{width: "100%"}} onClick={()=> {deleteAsset(asset._id)}}><DeleteIcon onClick={()=> {deleteAsset(asset._id)}}/></Button> </div>  </Card>)   :   
               <Typography gutterBottom variant="h5" align="center" fontFamily={'cursive'}  margin={5}>
                No Assets
                </Typography>}
            {/* </Box> */}
          </Grid>

          <Dialog
        // edit asset
        open={isEditAssetOpen} onClose={handleClickCloseEditAsset} fullWidth maxWidth="sm"  >
        <DialogTitle bgcolor={'black'} color={'white'} fontFamily={'revert'} margin={1} >Edit Asset Details<IconButton onClick={handleClickCloseEditAsset} style={{ float: 'inline-start' }}></IconButton>  </DialogTitle>
        <DialogContent >
          <Stack spacing={2} margin={2}>
            <Box display={"flex"} justifyContent={'center'}>
              <img alt="imageBroken" src={imgSrc ? URL.createObjectURL(imgSrc) : homeAvatar} style={{ height: "250px", width: "350px" }} className="img-fluid" />
            </Box>
            <input style={{ display: "none" }} ref={fileInputRef} type="file" onChange={imgSelected}></input>
            <Button color="info" variant="contained" onClick={selectImg}>Upload Asset Image</Button>
            <TextField variant="outlined" label="Address" onChange={event => { setEditAsset(prev => { return { ...prev, address: event.target.value } }) }}></TextField>
            <TextField variant="outlined" label="Price" onChange={event => { setEditAsset(prev => { return { ...prev, price: event.target.value } }) }}></TextField>
            <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
            <Button color="info" variant="contained" onClick={editAssetDetails}>Submit</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>

      <Dialog
        // Edit User Profile
        open={isEditUserOpen} onClose={handleClickCloseEditUser} fullWidth maxWidth="sm"  >
        <DialogTitle bgcolor={'black'} color={'white'} fontFamily={'revert'} margin={1} >Edit Your Profile<IconButton onClick={handleClickCloseEditUser} style={{ float: 'inline-start' }}></IconButton>  </DialogTitle>
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


