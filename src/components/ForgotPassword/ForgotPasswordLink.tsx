import React, {ReactElement} from "react";
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import {FormState} from "../../pages/Authentication";


const useStyles = makeStyles(theme=> ({
   forgotPasswordParagraph:{
       color:"#FFFFFF",
       display:'inline-block',
       padding: '0 10px 0 0'
   },
    linkRoot: {
        padding:'0px',
        margin:'0px',
        display:'inline-block',
        textTransform: 'none',
        backgroundColor: 'transparent',
        color: `#FFFFFF`,
        '&:hover' : {
            backgroundColor: 'transparent',
        }
    },
    label:{
        '&:hover' : {
            textDecoration:'underline',
        }
    }
}));

interface ForgotPasswordLinkProps {
    changeFormState(formState:FormState): void,
    containerStyle:string
}


function ForgotPasswordLink({changeFormState,containerStyle}:ForgotPasswordLinkProps):ReactElement {
    const classes = useStyles();
    return (
        <Grid container justify="center" className={containerStyle}>
            <Grid item >
                <Typography component="p" variant="body2" className={classes.forgotPasswordParagraph}>
                   Forgot your password ?
                </Typography>
                <Button
                    disableRipple={true}
                    variant={'text'}
                    classes={{
                        root:classes.linkRoot,
                        label:classes.label
                    }}
                    onClick={()=>{changeFormState(FormState.ResetPassword)}}
                > Get a new password
                </Button>
            </Grid>
        </Grid>
    );
}
export default ForgotPasswordLink;
