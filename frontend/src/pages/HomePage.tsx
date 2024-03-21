import { Grid } from "@mui/material";
import Property from "../components/Property";
import LoadingSpinner from "../components/LoadingSpinner";
import React, { useEffect, useState } from "react";


import Navbar from "../components/NavBar";

const HomePage = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {

        const response = await fetch('http://localhost:3000/assets', {
          headers: {
            'Content-Type': 'application/json'
          },
          // enable CORS
          mode: 'cors',
        });
        const assets = await response.json();
        assets.forEach(async (asset) => {
          // const comments = await fetchDataComment(asset._id);
          let comments = await fetchDataComment(asset._id);
          asset.comments = comments;
          setAssets(assets);
        }
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Call the fetch data function


    const fetchDataComment = async (assetid: string) => {
      let data = [];
      try {
        const response = await fetch('http://localhost:3000/comments/asset?assetId=' + assetid, {
          headers: {
            'Content-Type': 'application/json'
          },
          // enable CORS
          mode: 'cors',
        });
        data = await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      return data;
    };

    fetchData();

  }, []); // The empty dependency array ensures the effect runs once after the initial render


  if (!assets) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Navbar></Navbar>


      <Grid  >

        {/* <FilterBar></FilterBar> */}

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    
        padding={6}


          direction="row"
          justifyContent="center"
          alignItems="center"

          sx={{
            backgroundImage: 'url(https://img.freepik.com/free-photo/old-cement-wall-texture_1149-1280.jpg)',
            backgroundPosition: 'center',

          }}



        >

          {assets && assets.map((asset) => <Property asset={asset} key={asset._id} />)}
        </Grid>
      </Grid>


    </div>
  );
};


export default HomePage;