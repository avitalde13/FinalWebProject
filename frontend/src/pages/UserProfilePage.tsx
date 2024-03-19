import React, { useEffect, useState } from "react";
import { Container, Typography, Divider, Card, CardContent, Grid, Box , Fab} from "@mui/material";
import Navbar from "../components/NavBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { assert } from "console";
import Property from "../components/Property";
import EditIcon from '@mui/icons-material/Edit';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [assets, setAsset] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/info', {
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


    const fetchAssetData = async (assetId) => {
      try {
        const response = await fetch('http://localhost:3000/assets/' + assetId, {
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
          <Grid item xs={6} container direction="row" alignItems='baseline' >
            <Card >
              <CardContent >
                <Typography variant="h6" gutterBottom align="center" fontFamily={'unset'} bgcolor={'Highlight'}>
                  Profile Picture
                </Typography>
                <img src={`http://localhost:3000/file?file=${user.fileName}`} alt="" style={{ height: "250px", width: "450px" }} />
              </CardContent>
            </Card>
          </Grid>



          <Grid item xs={6} justifyContent="center" alignItems="center" >
            <Grid item xs={12} container justifyContent={'right'} >
              <Fab size="small" color="primary" aria-label="edit"   >
                <EditIcon />
              </Fab>
            </Grid>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontFamily={'unset'} bgcolor={'Highlight'}>
                  User Name
                </Typography>
                <Typography variant="body1">
                  {user.name}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontFamily={'unset'} bgcolor={'Highlight'}>
                  Email
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Typography gutterBottom variant="h3" align="center" fontFamily={'cursive'} paddingTop={2} bgcolor={'highlight'} margin={5}>
            User Assets
          </Typography>


          <Grid item xs={12} container justifyContent="center" alignItems="center" >
            <Box display={'flex'} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'} maxWidth={'60rem'}>
              {assets ? assets.map((asset) =>
                <Property asset={asset} key={asset._id} />) : <h1>No Assets</h1>}
            </Box>
          </Grid>


        </Grid>




      </Grid>





    </div>
  );
};

export default UserProfile;


