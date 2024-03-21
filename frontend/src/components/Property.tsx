
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



interface Props {
    asset: any;
}

const Property = (props: Props) => {
    // return (
    //     <div>
    //         <p>id: {props.property.objectID}</p>
    //         <p>price: {props.property.price.toString()}</p>
    //         <p>contact name: {props.property.contactName}</p>
    //         <p>rooms: {props.property.rooms.toString()}</p>
    //         <p>rooms: {props.property.coverPhoto.url}</p>

    //         <p>------------------------</p>
    //     </div>
    // );

    return (
        <Card sx={{ maxWidth: 300, maxHeight: 400, justifyContent: 'center', margin: 1}} >
          <CardActionArea>
            
            
            <CardMedia
              component="img"
              height="150"
              image=  {props.asset.fileName ? `http://localhost:3000/public/${props.asset.fileName}` : props.asset.imgSrc}
              alt="green iguana"
            />
            <CardContent>
              
              
              <Typography gutterBottom variant="h5"  justifyContent={"center"} component="div" >
                Price: {props.asset.price} $
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address: {props.asset.address}  
              
              </Typography>
              {props.asset.comments ? (
                props.asset.comments.map((comment) => (
                  <p>{comment.text}</p>
                ))
              ) : (
                <p>No comments</p>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      );

}

export default Property;