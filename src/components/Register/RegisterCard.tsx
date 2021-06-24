import React, {ReactElement, ReactNode, useEffect} from "react";
import {Button, makeStyles, Theme, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import Card from '@material-ui/core/Card';
import {Auth} from 'aws-amplify';
import Input from "../Authentication/Input";
import {FormState} from "../../pages/Authentication";


interface RegisterCardProps {
    children?: ReactNode,
    height: number,
    width: number,
    firstName: string,
    lastName: string,
    email:string,
    password:string,
    confirmPassword: string,
    handleChange?(event:React.ChangeEvent<HTMLInputElement>): void,
    changeFormState(formState:FormState): void,
    changeCardHeightAndWidth(cardHeight:number,cardWidth:number):void
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
        width: `${props.width}rem`
    }),
    header: {
        padding: '1.25rem 0'
    },
    displayAlert: {
        display:'flex'
    },
    hideAlert: {
        display:'none'
    },
    button: {
        marginBottom:'0.5rem'
    },
    lostCode : {
        display:'inline-block',
        padding: '0 10px 0 0'
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



function RegisterCard({changeCardHeightAndWidth,
                          changeFormState,
                          height,
                          width,
                          password,
                          confirmPassword,
                          email,
                          firstName,
                          handleChange}: RegisterCardProps): ReactElement {

    const classes = useStyles({height, width});
    const [open, setOpen] = React.useState<boolean | undefined>(false);
    const [error, setError] = React.useState<string>("");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            setError("The password and confirmation password do not match. ")
            setOpen(true);
            changeCardHeightAndWidth(32,20)
            return
        }
        try{
             await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    email: email,
                    given_name: firstName
                }
            })
            await changeFormState(FormState.ConfirmSignUp);
        } catch(error) {
            setOpen(true);
            setError(error.message)
            changeCardHeightAndWidth(34,20)
        }
    }

    useEffect(() => {
        changeCardHeightAndWidth(30,20)
    },[]);

    return (
        <Card className={classes.root}>
            <Alert severity="info"
                   className={open? classes.displayAlert: classes.hideAlert}
                   variant={'standard'}
            >{error}
            </Alert>
            <Typography component="h1" variant="h5" className={classes.header}>
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
                <Input
                    fullWidth={true}
                    type="text"
                    name="firstName"
                    required={true}
                    value={firstName}
                    onChange={handleChange}
                >First Name
                </Input>
                <Input
                    fullWidth={true}
                    type="email"
                    name="email"
                    required={true}
                    value={email}
                    onChange={handleChange}
                >Email Address
                </Input>
                <Input
                    fullWidth={true}
                    type="password"
                    name="password"
                    required={true}
                    value={password}
                    onChange={handleChange}
                >Password
                </Input>
                <Input
                    fullWidth={true}
                    type="password"
                    name="confirmPassword"
                    required={true}
                    value={confirmPassword}
                    onChange={handleChange}
                > Confirm Password
                </Input>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}
                > Sign Up
                </Button>
            </form>
            <div>
                <Typography component="p" variant="body2" className={classes.lostCode}>
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
                > Sign In
                </Button>
            </div>
        </Card>
    );
}

export default RegisterCard;
