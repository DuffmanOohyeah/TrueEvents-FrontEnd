import React, {ReactElement, ReactNode, useEffect, useState} from "react";
import {Button, makeStyles, Theme, Typography} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import {Auth} from 'aws-amplify';
import Input from "./Input";
import useIsLoggedIn from "../../utils/useIsLoggedIn";
import {FormState} from "../../pages/Authentication";
import {Alert} from "@material-ui/lab";


interface loginCardProps {
    children?:ReactNode,
    height:number
    width:number
    email:string,
    password:string,
    handleChange?(event:React.ChangeEvent<HTMLInputElement>): void,
    changeFormState(formState:FormState): void,
    changeCardHeightAndWidth(cardHeight:number,cardWidth:number):void
}
interface StyleProps {
    height:number,
    width:number,
}

const useStyles = makeStyles<Theme , StyleProps>(theme => ({
    root : props => ({
        padding: '2rem',
        borderRadius: '4px 0px 0px 4px',
        height: `${props.height}rem`,
        width: `${props.width}rem`,
    }),
    header: {
        padding: '1.25rem 0'
    },
    button: {
        marginBottom: '1.25rem'
    },
    displayAlert: {
        display:'flex'
    },
    hideAlert: {
        display:'none'
    }
}));



function LoginCard(props:loginCardProps): ReactElement {


    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    let history = useHistory();
    const isLoggedIn = useIsLoggedIn();
    const changeFormState = props.changeFormState;
    const changeCardHeightAndWidth = props.changeCardHeightAndWidth;
    const classes = useStyles({height:props.height,width:props.width});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        Auth.signIn(props.email, props.password).then((user)=>{
                history.push('/');
        }).catch((error)=>{
            setLoading(false);
            if(error.code === 'UserNotConfirmedException') {
                changeFormState(FormState.ConfirmSignUp)
            }
            if(error.code === 'UserNotFoundException'){
                setAlert("User is not exist , Please Create New Account");
                setOpen(true);
                changeCardHeightAndWidth(24,20)
            }
            if(error.code === 'NotAuthorizedException') {
                setAlert(error.message);
                setOpen(true)
                changeCardHeightAndWidth(24,20)
            }
        })
    };

    useEffect(() => {
        if(isLoggedIn) {
            history.push("/")
        }
        changeCardHeightAndWidth(22,20)
    },[ history, isLoggedIn]);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Card className={classes.root}>
            <Alert severity="info"
                   className={open? classes.displayAlert: classes.hideAlert}
                   variant={'standard'}
            >{alert}
            </Alert>
            <Typography component="h1" variant="h5" className={classes.header}>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <Input
                    fullWidth={true}
                    type="email"
                    name="email"
                    required={true}
                    value={props.email}
                    onChange={props.handleChange}
                >Email Address
                </Input>
                <Input
                    fullWidth={true}
                    type="password"
                    name="password"
                    required={true}
                    value={props.password}
                    onChange={props.handleChange}
                >Password
                </Input>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className={classes.button}
                > Sign In
                </Button>
            </form>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() =>  changeFormState(FormState.Signup)}
            > Create Account
            </Button>
        </Card>
    );
}

export default LoginCard;
