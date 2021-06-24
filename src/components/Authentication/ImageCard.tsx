import React, {ReactElement, ReactNode} from "react";
import {makeStyles, CardMedia, Card, Theme, Typography, CardContent} from "@material-ui/core";
import loginImage from '../../images/login-image.jpg';


interface imageCardProps {
    children?: ReactNode,
    height: number
    width: number
}

interface StyleProps {
    height: number,
    width: number,
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    root: props => ({
        borderRadius: '0 4px 4px 0',
        width: `${props.width + 4}rem`,
        height: `${props.height + 4}rem`,
        position: 'relative',
        "&::after": {
            position: 'absolute',
            content: '" "',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'block',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.8169468470982143) 0%, rgba(0,0,0,0.45840342973126746) 33%)'
        }
    }),
    image: props => ({
        borderRadius: '0 4px 4px 0',
        width: `${props.width + 4}rem`,
        height: `${props.height + 4}rem`,
    }),
    content:{
        position: 'absolute',
        bottom: '20px',
        left: '0px',
        color: 'white',
        backgroundColor: 'transparent',
        padding:'2rem',
        zIndex:10,
    },
    title: {
        marginBottom:'0.625rem',
    }
}));

function ImageCard(props: imageCardProps): ReactElement {

    const classes = useStyles({height: props.height, width: props.width});
    return (
        <Card className={classes.root}
        >
            <CardMedia
                component="img"
                image={loginImage}
                className={classes.image}
            />
            <CardContent className={classes.content}>
                <Typography variant="h5" component="h5" className={classes.title}>
                   Welcome to Trueevents
                </Typography>
                <Typography variant="body2"  component="p" >
                    If you haven't yet registered for a demo account then please click link and register for one first.
                    You will to activate your demo login via a link sent to the email you enter during registration
                </Typography>
            </CardContent>
        </Card>
    );

}

export default ImageCard;
