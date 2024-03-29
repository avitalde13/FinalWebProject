import React, { useEffect, useState } from "react";
import { Container, Typography, Divider, Card, CardContent, Grid } from "@mui/material";
import Navbar from "../components/NavBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { assert } from "console";
import Property from "../components/Property";

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
        const response = await fetch('http://localhost:3000/assets/'+ assetId, {
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
    <div>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography variant="h3" align="center" gutterBottom fontFamily={'cursive'} bgcolor={'grey'}>
          User Profile
        </Typography>
        <Divider />

        <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  profilePic
                </Typography>
                <img src={`http://localhost:3000/file?file=${user.fileName}`} alt="" style={{ height: "250px", width: "450px" }}/>
              </CardContent>
            </Card>
          </Grid>


        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Name
                </Typography>
                <Typography variant="body1">{user.name}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}  container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} display={"flex"} flexDirection={"column"}>
            <Card >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Assets
                </Typography>
                <Typography variant="body1" >  {assets && assets.map((asset) => <Property asset={asset} key={asset._id} />)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserProfile;
