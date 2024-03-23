
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, DialogTitle, Grid, Link } from '@mui/material';
import Button from '@mui/material/Button';

import axios from 'axios';
import { createRoutesFromElements } from 'react-router-dom';
import { get } from 'http';
import CommentsDialog from './CommentsDialog';

interface Props {
  asset: any;
}

const Property = (props: Props) => {

  const [openCommentsDialog, setOpenCommentsDialog] = React.useState(false);

 
  // const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
  const handleClickOpen = () => () => {
    setOpenCommentsDialog(true);
    
  };

  return (
    <Card sx={{ maxWidth: 300, maxHeight: 400, justifyContent: 'center', margin: 1 }} >
      <CardActionArea>

        <CardMedia // image
          component="img"
          height="150"
          image={props.asset.fileName ? `http://localhost:3000/public/${props.asset.fileName}` : props.asset.imgSrc}
          alt="green iguana"
        />
        <CardContent>

          <Typography gutterBottom variant="h5" justifyContent={"center"} component="div" >
            Price: {props.asset.price} $
          </Typography>


          <Typography variant="body2" color="text.secondary">
            Address: {props.asset.address}
          </Typography>


          <React.Fragment>
            <Button onClick={handleClickOpen()}>comments</Button>
            <CommentsDialog assetId={props.asset._id} openState={openCommentsDialog} setOpenState={setOpenCommentsDialog} /> 
          </React.Fragment>

          <Typography variant="body2" color="text.secondary">
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              {/* {props.asset.comments ? (
                props.asset.comments.map((comment) => (
                  <p>{comment.text}</p>
                ))
              ) : (
                <p>No comments</p>
              )} */}
            </Link>
          </Typography>



        </CardContent>
      </CardActionArea>
    </Card>
  );

}

export default Property;