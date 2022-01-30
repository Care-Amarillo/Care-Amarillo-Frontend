import React, {Component} from 'react';
import axios from "axios";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Login.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Link, Redirect} from "react-router-dom";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";
import {ToastContainer} from "react-toastr";
import Copyright from '../Copyright/Copyright';
import {Avatar, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PopUp from './PopUp';
import CareAppNav from '../../containers/CareAppNav';
import ForgotPasswordDialog from "./ForgotPasswordDialog";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#132C3C",
        },
        secondary: {
            main: "#132C3C",
        },
    },
});


const useStyles = makeStyles((theme) => ({
    avatar: {
        marginBottom: 6,
        marginLeft: theme.spacing(18),
        backgroundColor: "#132C3C",
        alignContent: 'center'
    },
    root: {
        width: '100%',
        // height: '100vh',
        marginTop: theme.spacing(-2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
        display: "flex",
        flexDirection: "column"
    },
    btn: {
        textAlign: 'center',
        position: 'absolute',
        top: 30,
        left: 42,
        zoom: 1.5,
    },
}));


const ResetForm = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div id="background">
            <div>
                <Container component="main" maxWidth="xs">
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">Reset Password</Typography>
                    <br/>
                    <ThemeProvider theme={theme}>
                        <form className={classes.form} noValidate autoComplete="off">

                            <TextField id="password" label="Password" onChange={props.onChangePass} variant="outlined" type="password"/>
                            <TextField id="confirmpassword" label="Confirm Password" onChange={props.onChangeConfirmPass} type="password"
                                       variant="outlined"/>
                            <Button onClick={props.resetPassword} variant="contained" id="loginButton">
                                Reset
                            </Button>


                        </form>
                    </ThemeProvider>
                </Container>
            </div>
        </div>
    );
}


class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: "",
            email: "",
            userId: "",
            goToLogin: false,
            password: "",
            confirmPassword: "",
            openDialog: false,
        }
    }


    componentDidMount() {
        this.props.setIsHomePage(false);
        this.checkForValidUUID();
    }

    togglePop = () => {
        this.setState({
            openDialog: !this.state.openDialog
        });
    };


    resetDone = () =>{
        this.container.success(`Successfully Sent Password Reset Link`, `Success`, {
            closeButton: true,
        });
    }




    onChangePass = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    onChangeConfirmPass = (e) => {
        this.setState({
            confirmPassword: e.target.value,
        });
    }

    loginClicked = () => {
        if (this.state.email === "" || this.state.password === "") {
            this.container.error(`Please fill out all fields`, `Error`, {
                closeButton: true,
            });
            return;
        }
        this.login();
    }

    resetPassword = async () => {


        if(this.state.password.length < 6){
            this.container.error(`Please enter a password with at least a length of 6 characters`, `Error`, {
                closeButton: true,
            });
            return ;
        }


        if(this.state.password !== this.state.confirmPassword){
            this.container.error(`Passwords do not match`, `Error`, {
                closeButton: true,
            });
            return ;
        }



        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/passwordRecovery`;

        const response = await axios({
            method: 'put',
            url: URL,
            data:{
                userId:this.state.userId,
                uuid:this.state.uuid,
                password:this.state.password,
            }

        });

        const data = await response.data;
        // console.log(`data: ${JSON.stringify(data)}`);

        const message = data["Message"];
        if(message && message === "Updated User successfully"){
            this.setState({
                goToLogin: true,
            });
        }
        else{
            this.container.error(`Error Updating Password`, `Error`, {
                closeButton: true,
            });

        }



    }


    checkForValidUUID = async () => {

        const uuid = this.props.match.params.id;

        this.setState({
            uuid: uuid,
        });

        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/getForgotPassword`;

        const response = await axios({
            method: 'post',
            url: URL,
            data:{
                uuid:uuid,
            }

        });

        const data = await response.data;
        // console.log(`data: ${JSON.stringify(data)}`);
        const message = data["Message"];
        if(message && message === "Successfully retrieved Password Recovery"){
            const recoveryData = data["data"];
            this.setState({
                userId: recoveryData["user"],
            });

        }
        else{
            this.setState({
                goToLogin: true,
            });
        }



    }

    render() {
        return !this.state.goToLogin ? (
            <div id="loginContainer">
                <ToastContainer
                    ref={ref => this.container = ref}
                    className="toast-bottom-right"
                />

                <ResetForm onChangeConfirmPass={this.onChangeConfirmPass} onChangePass={this.onChangePass}
                           resetPassword={this.resetPassword}/>
            </div>

        ) : <Redirect to="/login"/>;

    }
}

export default ResetPassword;
