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
import { CardActionArea, Grid, Link } from '@mui/material';

import Button from '@mui/material/Button';
import { networkInterfaces } from 'os';


interface Props {
    assetId: any;
    openState: any;
    setOpenState: any;
}

export default function CommentsDialog(props: Props) {

    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [comments, setComments] = React.useState([]);

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

    const handleClose = () => {
        props.setOpenState(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
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
        >
            <DialogTitle id="scroll-dialog-title">Comments</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>


                    <Grid paddingBottom={5}>
                        {comments.map((comment) => (
                        <Card>
                            <CardContent>
                                            {comment.date}
                                        <Typography variant="body1" gutterBottom fontFamily={'unset'} bgcolor={'Highlight'} textAlign={'center'}>
                                            {comment.userName}
                                        </Typography>
                                        <Typography variant="body2" fontSize={20} textAlign={'center'} fontStyle={'oblique'}>


                                        </Typography>
                                        <Typography variant="body2" gutterBottom fontFamily={'unset'} bgcolor={'Highlight'} textAlign={'center'}>
                                            {comment.text}
                                        </Typography>
                            </CardContent>
                        </Card>
                        ))}


                    </Grid>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>add comment..</Button>
                <Button onClick={handleClose}>cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
