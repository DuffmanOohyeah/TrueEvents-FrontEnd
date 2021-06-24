import React, {ReactElement} from "react";
import {InputLabel, Input as MuiInput, makeStyles} from "@material-ui/core";


interface inputProps {
    children:string,
    type:string,
    fullWidth:boolean
    name:string,
    required?:boolean,
    onChange?(event:React.ChangeEvent<HTMLInputElement>): void,
    value?:string,
}

const useStyles = makeStyles(theme=> ({
    root :{
        marginBottom: '1.25rem'
    },
    inputLabel: {
        marginBottom: '0.625rem',
        fontSize: '0.8rem'
    },
    input: {
        border: '1px solid #d3d3d3',
        borderRadius:'4px',
        padding: '0.5rem 0.5rem 0.4rem 0.5rem',
        height: '1.8rem',
        '&:hover, &focus': {
            border: `1px solid ${theme.palette.primary.light}`
        }
    },
}));


function Input(props:inputProps):ReactElement {
    const classes = useStyles();
    const id = props.children.replace(/\s+/g, '-').toLowerCase();
    return (
        <>
        <InputLabel
            htmlFor={id}
            className={classes.inputLabel}
        >{props.children.toUpperCase()}
        </InputLabel>
        <MuiInput
            id={id}
            type={props.type}
            fullWidth={props.fullWidth}
            className={classes.root}
            name={props.name}
            required={props.required}
            inputProps={{className: classes.input}}
            disableUnderline={true}
            onChange={props.onChange}
            value={props.value}
        />
        </>
    );
}
export default Input;
