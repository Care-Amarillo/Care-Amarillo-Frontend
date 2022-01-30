import React, {Component} from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Paper} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Close} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    modal: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    modalContent: {
        color: 'black',
        background: 'white',
        position: 'absolute',
        borderRadius: 5,
        border: 2,
        left: '30%',
        top: '18%',
    },
    close: {
        fontSize: '10%',
        paddingRight: 20,
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    text: {
        paddingLeft: 40,
        textAlign: 'left',
    },
    button: {
        display: 'flex',
        marginLeft: 390,
        marginTop: 35,
        color: 'white',
        backgroundColor: "#132C3C",
    },
    content: {
        height: 270,
        width: 500
    },
    email: {
        display: 'flex',
        marginLeft: 40,
        marginRight: 60,

    },
}));

const PopUpForm = (props) => {


    const classes = useStyles();
    return (
        <div className={classes.modal}>
            <div className={classes.modalContent}>
                <Paper className={classes.content}>
                    <div onClick={props.handleClick} className={classes.close}>
                        <Close fontSize='large'/>
                    </div>
                    <h2 className={classes.text}>Forgot Password</h2>
                    <p className={classes.text}>Please enter the email address associated with your account.</p>
                    <TextField placeholder="Email" className={classes.email}>
                        Email:
                        <input type="text" name="name"/>
                    </TextField>
                    <Button className={classes.button} type="submit" variant="contained">
                        Reset
                    </Button>
                </Paper>
            </div>
        </div>
    );
}


export default class PopUp extends Component {

    handleClick = () => {
        this.toggle();
    }


    render() {
        return (
            <PopUpForm/>
        );
    }
}
