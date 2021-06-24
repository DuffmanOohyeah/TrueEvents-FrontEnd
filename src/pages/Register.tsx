import React, {ReactElement} from "react";
import Background from "../components/Authentication/Background";
import {Grid, makeStyles} from "@material-ui/core";
import ImageCard from "../components/Authentication/ImageCard";

const useStyles = makeStyles(theme=> ({
    root :{
        display: 'flex',
        height: '100vh',
        justifyContent:'center',
        alignItems:'center'
    }
}));

function Register():ReactElement {
    const classes = useStyles();
    /* height and width in rem unit*/
    const cardHeight = 30;
    const cardWidth = 20;
    return (
        <>
            <Background/>
            <div className={classes.root}>
                <Grid container justify="center" spacing={0}>
                    <Grid item >
                    </Grid>
                    <Grid item >
                        <ImageCard height={cardHeight} width={cardWidth}/>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default Register;
