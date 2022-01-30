import React, {Component} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Login.css';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Link, Redirect} from "react-router-dom";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";
import {ToastContainer} from "react-toastr";
import {Avatar, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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


const LoginForm = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div id="background">
            {/* <CareAppNav /> */}
            <div>
                <Container component="main" maxWidth="xs">
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">Sign In</Typography>
                    <br/>
                    <ThemeProvider theme={theme}>
                        <form className={classes.form} noValidat autoComplete="off">

                            <TextField id="email" label="Email" onChange={props.onChangeEmail} variant="outlined"/>
                            <TextField id="password" label="Password" onChange={props.onChangePass} type="password"
                                       variant="outlined"/>
                            <Button onClick={props.loginClicked} variant="contained" id="loginButton">
                                Login
                            </Button>


                        </form>
                    </ThemeProvider>
                </Container>
            </div>
        </div>
    );
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: "",
            email: "",
            password: "",
            openDialog: false,
        }
    }


    componentDidMount() {
        this.props.setIsHomePage(false);
    }

    togglePop = () => {
        this.setState({
            openDialog: !this.state.openDialog
        });
    };


    resetDone = () => {
        this.togglePop();
        this.container.success(`Successfully Sent Password Reset Link`, `Success`, {
            closeButton: true,
        });
    }

    // todo: put in its own class so not duplicated across register
    login = async () => {

        this.props.setToken(this.state);

    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }

    onChangePass = (e) => {
        this.setState({
            password: e.target.value,
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

    render() {
        return !this.props.token ? (
            <div id="loginContainer">
                <ToastContainer
                    ref={ref => this.container = ref}
                    className="toast-bottom-right"
                />

                <LoginForm onChangeEmail={this.onChangeEmail} onChangePass={this.onChangePass}
                           loginClicked={this.loginClicked}/>
                <Button onClick={this.togglePop} variant="outlined">
                    Forgot Password?
                </Button>
                <ForgotPasswordDialog open={this.state.openDialog} resetDone={this.resetDone}
                                      toggleClicked={this.togglePop}/>
            </div>

        ) : <Redirect to="/provider"/>;

    }
}

export default Login;
