import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from './Slider';


export default function BasicSelect() {
  const [price, setPrice] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setPrice(event.target.value as string);
  };

  return (
    <Box sx={{ maxWidth: 250,  maxHeight: 200}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Price</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={price}
          label="Price"
          onChange={handleChange}
        >
           <MenuItem value={20} > none </MenuItem>

          
          <MenuItem value={10} >   <Slider></Slider>   </MenuItem>
  
        </Select>
      </FormControl>
    </Box>
  );
}
