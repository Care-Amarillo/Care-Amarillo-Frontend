import React, { Component } from "react";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Close } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    modal: {
        position: 'fixed',
        zIndex: 1,
        width: 600,
        height: 500,
        color: (0, 0, 0, 0.25),
    },
    modalContent: {
        color:'black',
        background: 'white',
        position: 'absolute',
        borderRadius: 5,
        border: 2,
    },
    close: {
      fontSize: 'large',
      paddingRight: 20,
      paddingTop: 10,
      display: 'flex',
      justifyContent: 'flex-end'
    },
    text: {
      paddingLeft: 20,
      textAlign: 'left',
    },
    button: {
      paddingTop: 10,
      // display: 'flex',
    },
    content: {
      height: 300,
      width: 500
    }
}));


const PopUpForm = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.modal}>   
      <div className={classes.modalContent}>
        <span onClick={props.handleClick} className={classes.close}>
          <Close />
        </span>
        <Paper className={classes.content}>
          <h3 className={classes.text}>Forgot Password</h3>
          <p className={classes.text}>Please enter the email address associated with your account.</p>
          <TextField placeholder="Email">
            Email:
            <input type="text" name="name" />
          </TextField>
          <br />
          <Button className={classes.button} type="submit" variant="contained" >
            Reset
          </Button>
        </Paper>
      </div>
    </div>
  );
}


export default class PopUp extends Component {
  
handleClick = (props) => {
  this.props.toggle();
}

render() {
    return (
      <PopUpForm />
    );
  }
}