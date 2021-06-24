import React, {ReactElement} from "react";
import {Button, Grid, makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme=> ({
    linkRoot: {
        textTransform: 'none',
        backgroundColor: '#FFFFFF',
        color: `#000000`,
        padding:'0.312rem 5rem',
    },
}));


function NeedHelpLoggingLink():ReactElement {
    const classes = useStyles();
    return (
        <Grid container justify="center">
            <Grid item >
                <Button
                    disableRipple={true}
                    variant="contained"
                    classes={{
                        root:classes.linkRoot,
                    }}
                    href={"mailto:support@trueevents.live?subject=issue%20logging%20in%20trueevents%20site"}
                > Need Help Logging in?
                </Button>
            </Grid>
        </Grid>
    );
}
export default NeedHelpLoggingLink;
