import { Card, Divider, Grid, List, Stack } from "@mui/material";
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


const UserProfile = () => {
    const [user, setUser] = useState({
        email: '',
        _id: ''
      });
  
    useEffect(() => {
      // Function to fetch data
      const fetchData = async () => {
        try {
   
          const response = await fetch('http://localhost:3000/users/info', {
            headers: {
                'Authorization': JSON.parse(localStorage.getItem('accessToken'))
              },
              // enable CORS
              mode: 'cors',
            });
          const userdata = await response.json();
          setUser(userdata);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      // Call the fetch data function
      
      fetchData();

    }, []); // The empty dependency array ensures the effect runs once after the initial render
  
    
    if (!user) {
      return <LoadingSpinner />;
    }

    return (
      <div>
        <Navbar></Navbar>
        <a>email: {user.email}</a>
        <br/>
        <a>id: {user._id}</a>
      </div>
    );
  };
  

export default UserProfile;