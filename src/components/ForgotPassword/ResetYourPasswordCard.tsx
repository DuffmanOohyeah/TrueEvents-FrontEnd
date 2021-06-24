import React, {ReactElement, useEffect, useState} from "react";
import {Button, makeStyles, Theme, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Input from "../Authentication/Input";
import {FormState} from "../../pages/Authentication";
import {Auth} from "aws-amplify";
import {Alert} from "@material-ui/lab";


interface ResetYourPasswordCardProps {
    height: number
    width: number
    email: string,

    handleChange?(event: React.ChangeEvent<HTMLInputElement>): void,

    changeFormState(formState: FormState): void,

    changeCardHeightAndWidth(cardHeight: number, cardWidth: number): void
}

interface StyleProps {
    height: number,
    width: number,
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    root: props => ({
        padding: '2rem',
        borderRadius: '4px 0px 0px 4px',
        height: `${props.height}rem`,
        width: `${props.width}rem`,
    }),
    header: {
        padding: '1.25rem 0'
    },
    displayAlert: {
        display: 'flex'
    },
    hideAlert: {
        display: 'none'
    },
    question : {
        display:'inline-block',
        padding: '0 10px 0 0',
        marginTop: '0.625rem',
    },
    resendCode: {
        padding:'0px',
        margin:'0px',
        display:'inline-block',
        textTransform: 'none',
        backgroundColor: 'transparent',
        color: `${theme.palette.primary.main}`,
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


function ResetYourPasswordCard({
                                   height,
                                   width,
                                   email,
                                   changeFormState,
                                   handleChange,
                                   changeCardHeightAndWidth
                               }: ResetYourPasswordCardProps): ReactElement {
    const classes = useStyles({height, width});
    const [alert, setAlert] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await Auth.forgotPassword(email)
            await changeFormState(FormState.ResetPasswordSubmit)
        } catch (error) {
            if (error.code === "UserNotFoundException") {
                setAlert("User is not found");
                setOpen(true);
                changeCardHeightAndWidth(18, 20);
                return
            }
            setAlert(error.message);
            setOpen(true);
            changeCardHeightAndWidth(18, 20);
        }
    };

    useEffect(() => {
        changeCardHeightAndWidth(16, 20)
    }, [])

    return (
        <Card className={classes.root}>
            <Alert severity="info"
                   className={open ? classes.displayAlert : classes.hideAlert}
                   variant={'standard'}
            >{alert}
            </Alert>
            <Typography component="h1" variant="h5" className={classes.header}>
                Reset Your Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <Input
                    fullWidth={true}
                    type="email"
                    name="email"
                    required={true}
                    value={email}
                    onChange={handleChange}
                >Email Address
                </Input>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                > Send Code
                </Button>
            </form>
            <div>
                <Typography component="p" variant="body2" className={classes.question}>
                    Have a Account ?
                </Typography>
                <Button
                    disableRipple={true}
                    variant={'text'}
                    classes={{
                        root: classes.resendCode,
                        label:classes.label
                    }}
                    onClick={()=>changeFormState(FormState.SignIn)}
                >  Back to Sign In
                </Button>
            </div>
        </Card>
    );
}

export default ResetYourPasswordCard;
