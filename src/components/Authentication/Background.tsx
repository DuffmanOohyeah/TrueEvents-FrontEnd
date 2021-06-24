import React, {ReactElement} from "react";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme=> ({
    root :{
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%) no-repeat fixed`,
        maxHeight:"100vh",
        height: "100%",
        top:"0",
        left:"0",
        zIndex: theme.custom.zIndex.BackgroundImg,
        width:"100%",
        position:"fixed"
    }
}));


function Background():ReactElement {
    const classes = useStyles();
    return (
        <div className={classes.root}/>
    );
}
export default Background;
