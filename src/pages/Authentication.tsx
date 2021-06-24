import React, {ReactElement, useState} from "react";
import Background from "../components/Authentication/Background";
import LoginCard from "../components/Authentication/LoginCard";
import { Grid, makeStyles} from "@material-ui/core";
import ImageCard from "../components/Authentication/ImageCard";
import RegisterCard from "../components/Register/RegisterCard";
import VerifyCodeCard from "../components/VerifyCode/VerifyCodeCard";
import ForgotPasswordLink from "../components/ForgotPassword/ForgotPasswordLink";
import ResetYourPasswordCard from "../components/ForgotPassword/ResetYourPasswordCard";
import ForgotPasswordSubmitCard from "../components/ForgotPassword/ForgotPasswordSubmitCard";
import FooterLogin from "../components/Authentication/FooterLogin";
import logo from "../images/logo.svg"

export enum FormState {
    SignIn,
    Signup,
    ConfirmSignUp,
    ResetPassword,
    ResetPasswordSubmit
}

interface UserInformation {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    code: string,
    temporaryPassword: string,
    formState: FormState
    cardHeight: number,
    cardWidth: number,
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridContainer: {
        margin: 'auto'
    },
    forgotPasswordLink: {
        marginTop:'2rem'
    },
    loginContainer: {
        position:'relative'
    },
    logo: {
        position:'absolute',
        height:'2rem',
        top:'-20px',
        left:'20px',
        background:'#FFFFFF',
        padding:'0.625rem',
        border:`1px solid ${theme.palette.primary.main}`,
        borderRadius:'4px 4px 4px 4px'
    }
}));


function Authentication(): ReactElement {
    const classes = useStyles();
    const [state, setState] = useState<UserInformation>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        code: "",
        temporaryPassword: "",
        formState: FormState.SignIn,
        cardHeight: 24,
        cardWidth: 20
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
    }

    const changeFormState = (formState: FormState) => {
        setState({
            ...state,
            formState,
        })
    }

    const changeCardHeightAndWidth = (cardHeight: number, cardWidth: number) => {
        setState({
            ...state,
            cardWidth,
            cardHeight,
        })
    }
    return (
        <>
            <Background/>
            <div className={classes.root}>
                <Grid container justify="center" spacing={0} className={classes.gridContainer}>
                    <Grid item className={classes.loginContainer}>
                        <img src={logo} className={classes.logo}/>
                        {(() => {
                            switch (state.formState) {
                                case FormState.SignIn :
                                    return (
                                        <LoginCard
                                            height={state.cardHeight}
                                            width={state.cardWidth}
                                            email={state.email}
                                            password={state.password}
                                            handleChange={handleChange}
                                            changeFormState={changeFormState}
                                            changeCardHeightAndWidth={changeCardHeightAndWidth}
                                        />
                                    )
                                case FormState.Signup :
                                    return <RegisterCard
                                        height={state.cardHeight}
                                        width={state.cardWidth}
                                        email={state.email}
                                        password={state.password}
                                        confirmPassword={state.confirmPassword}
                                        firstName={state.firstName}
                                        lastName={state.lastName}
                                        handleChange={handleChange}
                                        changeFormState={changeFormState}
                                        changeCardHeightAndWidth={changeCardHeightAndWidth}
                                    />
                                case FormState.ConfirmSignUp :
                                    return <VerifyCodeCard
                                        height={state.cardHeight}
                                        width={state.cardWidth}
                                        email={state.email}
                                        code={state.code}
                                        handleChange={handleChange}
                                        changeFormState={changeFormState}
                                        changeCardHeightAndWidth={changeCardHeightAndWidth}
                                    />
                                case FormState.ResetPassword :
                                    return <ResetYourPasswordCard
                                        height={state.cardHeight}
                                        width={state.cardWidth}
                                        email={state.email}
                                        handleChange={handleChange}
                                        changeFormState={changeFormState}
                                        changeCardHeightAndWidth={changeCardHeightAndWidth}
                                    />
                                case FormState.ResetPasswordSubmit :
                                    return <ForgotPasswordSubmitCard
                                        height={state.cardHeight}
                                        width={state.cardWidth}
                                        email={state.email}
                                        code={state.code}
                                        password={state.password}
                                        confirmPassword={state.confirmPassword}
                                        handleChange={handleChange}
                                        changeFormState={changeFormState}
                                        changeCardHeightAndWidth={changeCardHeightAndWidth}
                                    />
                            }
                        })()}
                    </Grid>
                    <Grid item>
                        <ImageCard height={state.cardHeight} width={state.cardWidth}/>
                    </Grid>
                    <ForgotPasswordLink containerStyle={classes.forgotPasswordLink} changeFormState={changeFormState}/>
                </Grid>
                <FooterLogin/>
            </div>
        </>
    )
}

export default Authentication;
