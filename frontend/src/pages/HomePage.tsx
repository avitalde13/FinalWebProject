import { Card, CssBaseline, Divider, Grid, List, Stack } from "@mui/material";
import Property from "../components/Property";
// import { TApiResponse, useApiGet } from "../utils/useFetchApi";
import LoadingSpinner from "../components/LoadingSpinner";
import FilterBar from "../components/Filters/FilterBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "../components/Filters/Slider";
import { convertToObject } from "typescript";
import { Center } from "@chakra-ui/react";
// import MultiActionAreaCard from "../components/AssetCard";
import Navbar from "../components/NavBar";
import { px } from "framer-motion";
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

          {assets.map((asset) => <Property asset={asset} key={asset._id} />)}
        </Grid>
      </Grid>


    </div>
  );
};


export default HomePage;