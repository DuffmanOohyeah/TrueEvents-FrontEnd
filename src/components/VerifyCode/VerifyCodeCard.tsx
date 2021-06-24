import React, {ReactElement, ReactNode, useEffect} from "react";
import {Button, makeStyles, Theme, Typography} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import {Auth} from 'aws-amplify';
import Input from "../Authentication/Input";
import {FormState} from "../../pages/Authentication";


interface VerifyCodeProps {
    children?:ReactNode,
    height:number
    width:number
    email:string,
    code:string,
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



function VerifyCodeCard({changeCardHeightAndWidth,...props}:VerifyCodeProps): ReactElement {

    const classes = useStyles({height:props.height,width:props.width});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await Auth.confirmSignUp(props.email,props.code.trim());
            await props.changeFormState(FormState.SignIn);
        } catch (e) {
            console.log(e)
        }
    };

    const resendConfirmationCode = async () => {
        try {
            await Auth.resendSignUp(props.email);
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }
    useEffect(() => {
        changeCardHeightAndWidth(20,20)
    },[]);

    return (
        <Card className={classes.root}>
            <Typography component="h1" variant="h5" className={classes.header}>
                Confirm Sign Up
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
                    type="code"
                    name="code"
                    required={true}
                    value={props.code}
                    onChange={props.handleChange}
                >Code
                </Input>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Confirm
                </Button>
            </form>
            <div>
                <Typography component="p" variant="body2" className={classes.lostCode}>
                    Lost your code ?
                </Typography>
                <Button
                    disableRipple={true}
                    variant={'text'}
                    onClick={resendConfirmationCode}
                    classes={{
                        root: classes.resendCode,
                        label:classes.label
                    }}
                >Resend Code
                </Button>
            </div>
        </Card>
    );
}

export default VerifyCodeCard;
