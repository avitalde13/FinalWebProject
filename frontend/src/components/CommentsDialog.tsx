import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid, Link } from '@mui/material';

import Button from '@mui/material/Button';
import { networkInterfaces } from 'os';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { text } from 'stream/consumers';
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
    assetId: any;
    openState: any;
    setOpenState: any;
}

export default function CommentsDialog(props: Props) {

    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState({ textComment: "", assetId: "", userId: "" });

    const [userId, setUserId] = React.useState('' as string);

    const getCommentsByAssetId = async (assetId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/comments/asset?assetId=${assetId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                // enable CORS
                mode: 'cors',
            });
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteComment = async (commentId: string) => {
        try {
            console.log(commentId);
            const response = await fetch(`http://localhost:3000/comments/delete/?commentId=${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                // enable CORS
                mode: 'cors',
            });
            const data = await response.json();
            console.log(data);
            getCommentsByAssetId(props.assetId);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleClose = () => {
        props.setOpenState(false);
    };


    const getUserId = async () => {

        const user_id = await axios.get('http://localhost:3000/users/info', {
            headers: {
                'Authorization': JSON.parse(localStorage.getItem('accessToken'))
            }
        }).then(res => res.data);  // get user id

        setUserId(user_id._id);
    }

    const submitAddComment = async () => {
        try {

            const response = await fetch('http://localhost:3000/comments/addComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    textComment: newComment.textComment,
                    assetId: props.assetId,
                    userId: userId
                })
            });
            const data = await response.json();
            setComments([...comments, data]);
            setNewComment({ textComment: "", assetId: "", userId: "" });
            
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const formatedDate = (date: String) => {

        const newDate = date.split('T');
        const days = newDate[0];
        const time = newDate[1].split('.')[0];
        const hours = time.split(':')[0];
        const minutes = time.split(':')[1];
        return days + ' , ' + hours + ':' + minutes;
    }



    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        getUserId();



        getCommentsByAssetId(props.assetId);
        setScroll('paper');
        if (props.openState) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [props.openState]);


    return (
        <Dialog
            open={props.openState}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}


        >
            <DialogTitle id="scroll-dialog-title">Comments</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>


                    <Grid >
                        {comments.length ==0 ? <h4>  no comments </h4> : comments.map((comment) => (
                            <Box marginBottom={3}>
                                <Card >
                                    <CardContent >
                                        <Typography variant="body1" gutterBottom fontFamily={'unset'} textAlign={'right'} >
                                            {formatedDate(comment.date)}</Typography>

                                        <Typography variant="body2" gutterBottom fontFamily={'unset'} textAlign={'left'}>
                                            {comment.userName} :
                                        </Typography>

                                        <Typography variant="body2" gutterBottom fontFamily={'unset'} bgcolor={'Highlight'} textAlign={'center'} fontWeight={'bold'} padding={1}>
                                            {comment.text}
                                        </Typography>
                                        {userId === comment.userId && <DeleteIcon onClick={() => deleteComment(comment._id)} />}
                                    </CardContent>
                                </Card>
                            </Box>


                        ))}


                    </Grid>



                </DialogContentText>
            </DialogContent>
            <DialogActions>

                <TextField fullWidth={true} variant="outlined" label="Comment Text"  value= { newComment.textComment} onChange={event => { setNewComment(prev => { return { ...prev, textComment: event.target.value } }) }}></TextField>
                <Button onClick={submitAddComment} variant='text'>add comment..</Button>
                <Button onClick={handleClose}>cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
