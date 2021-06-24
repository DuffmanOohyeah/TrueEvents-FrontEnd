import React, {ReactElement} from "react";
import {makeStyles} from "@material-ui/core";
import PowerByBox from "./PowerByBox";
import NeedHelpLoggingLink from "./NeedHelpLoggingLink";


const useStyles = makeStyles(theme=> ({
    footerContainer: {
        display:'flex',
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
        margin:'2rem',
    },
    flexItems: {
        flex:'0 0 20%'
    }
}));


function FooterLogin():ReactElement {
    const classes = useStyles();
    return (
        <div className={classes.footerContainer}>
            <PowerByBox className={classes.flexItems}/>
            <NeedHelpLoggingLink />
            <div className={classes.flexItems}> </div>
        </div>
    );
}
export default FooterLogin;
