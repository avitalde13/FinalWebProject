import { Card, Divider, Grid, List, Stack } from "@mui/material";
import Property from "../components/Property";
import { PropertyType } from "../models/Property";
// import { TApiResponse, useApiGet } from "../utils/useFetchApi";
import LoadingSpinner from "../components/LoadingSpinner";
import FilterBar from "../components/Filters/FilterBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "../components/Filters/Slider";
import MultiActionAreaCard from "../components/AssetCard";
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
          const data = await response.json();
          setAssets(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      // Call the fetch data function
      fetchData();
    }, []); // The empty dependency array ensures the effect runs once after the initial render
  
    return (
      <div>
        <h2>Asset List</h2>
        <ul>
            <FilterBar></FilterBar>
            
          {assets.map((asset:PropertyType, i:number) => <Property property={asset} key={ asset._id} />)}
        </ul>
      </div>
    );
  };
  

export default HomePage;