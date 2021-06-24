import React, {ReactElement} from "react";
import {Grid, makeStyles, Typography} from "@material-ui/core";

interface PowerByBoxProps {
    className:string
}

const useStyles = makeStyles(theme=> ({
    title:{
        color:'#FFFFFF'
    }
}));
function PowerByBox(props:PowerByBoxProps):ReactElement {
    const classes = useStyles();
    return (
        <Grid container justify="center" className={props.className}>
            <Grid item >
               <Typography
                variant='h6'
                className={classes.title}
               >Trueevents</Typography>
                <Typography
                    variant='body2'
                    className={classes.title}
                >Powered By Trueevents</Typography>
            </Grid>
        </Grid>
    );
}
export default PowerByBox;
