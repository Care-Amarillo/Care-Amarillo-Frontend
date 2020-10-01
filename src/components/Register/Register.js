import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './Register.css';
import {Redirect} from "react-router-dom";
import axios from "axios";
import AlertDialogSlide from "../AlertDialogSlide";
import {ToastContainer} from "react-toastr";
import CareAppNav from '../CareAppBar/CareAppNav';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
        // flexGrow: 1,
        // width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        // marginTop: theme.spacing(1),
        // marginBottom: theme.spacing(1),
    },
    form: {
        // '& > *': {
        //     margin: theme.spacing(1),
        //     width: '50ch',
        // },
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    main: {
        // marginTop: 50,
    }
}));

const getSteps = () => {
    return ['Personal Info', 'Login Info'];
}

const FormOne = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;

    const onChangeFirstName = (e) => {
        registerComponent.setState({
            firstName: e.target.value,
        });
    };

    const onChangeLastName = (e) => {
        registerComponent.setState({
            lastName: e.target.value,
        });
    };

    const onChangePhone = (e) => {
        registerComponent.setState({
            phone: e.target.value,
        });
    };

    const onChangeEmail = (e) => {
        registerComponent.setState({
            email: e.target.value,
        });
    };

    const onChangePass = (e) => {
        registerComponent.setState({
            password: e.target.value,
        });
    };

    const onChangeConfirmPass = (e) => {
        registerComponent.setState({
            confirmPassword: e.target.value,
        });
    };
    return( 
    <Grid container spacing={3} className={classes.main}>
        {/* <form className={classes.form} noValidate autoComplete="off"> */}
        <Grid item xs={6} className={classes.paper}>
        
            <TextField id="firstName" label="First Name" onChange={onChangeFirstName} variant="outlined" value={registerComponent.state.firstName}/>
            <TextField id="lastName" label="Last Name" value={registerComponent.state.lastName} onChange={onChangeLastName} variant="outlined"/>
            <TextField id="phone" label="Phone Number"  inputProps={{ maxLength: 10 }} onInput={(e)=>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
            }} onChange={onChangePhone} type="number" value={registerComponent.state.phone} variant="outlined"/>
        </Grid>
        <Grid item xs={6} className={classes.paper}>   
            <TextField id="email" label="Email" value={registerComponent.state.email} onChange={onChangeEmail} variant="outlined"/>
            <TextField id="password" label="Password" value={registerComponent.state.password} onChange={onChangePass} type="password" variant="outlined"/>
            <TextField id="confirmPassword" label="Confirm Password" value={registerComponent.state.confirmPassword} onChange={onChangeConfirmPass} type="password"
                    variant="outlined"/>
        </Grid>
        {/* </form> */}
    </Grid>
    );
}

// const FormTwo = (props) => {
//     const classes = useStyles();
//     const registerComponent = props.registerComponent;

    // const onChangeEmail = (e) => {
    //     registerComponent.setState({
    //         email: e.target.value,
    //     });
    // };

    // const onChangePass = (e) => {
    //     registerComponent.setState({
    //         password: e.target.value,
    //     });
    // };

    // const onChangeConfirmPass = (e) => {
    //     registerComponent.setState({
    //         confirmPassword: e.target.value,
    //     });
    // };
//     return( 
//         <Grid item xs={12} md={6}>
//     <form className={classes.form} noValidate autoComplete="off">
//         <TextField id="email" label="Email" value={registerComponent.state.email} onChange={onChangeEmail} variant="outlined"/>
//         <TextField id="password" label="Password" value={registerComponent.state.password} onChange={onChangePass} type="password" variant="outlined"/>
//         <TextField id="confirmPassword" label="Confirm Password" value={registerComponent.state.confirmPassword} onChange={onChangeConfirmPass} type="password"
//                    variant="outlined"/>
//     </form>
//     </Grid>
//     );
// }

const FormContainer = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;
    const registerState = registerComponent.state;
    const [open, setOpen] = React.useState(false);
    const alertTitle = "Are You Sure?";
    const yesOptionTitle = "Yes";
    const noOptionTitle = "Cancel";

    const alertDescription = <div>
        <div>
            First Name: {registerState.firstName}
        </div>
        <div>
            Last Name: {registerState.lastName}
        </div>
        <div>
            Phone: {registerState.phone}
        </div>
        <div>
            Email: {registerState.email}
        </div>
    </div>;


    

    const slideAlertCallback = (isTrue) => {
        if (isTrue) {
            registerComponent.register();
        } else {
            console.log("is false");
        }
    }

    const askForConfirmation = () => {

        if(registerState.email === "" || registerState.password === "" ||registerState.confirmPassword === ""  || registerState.firstName === ""  || registerState.lastName === "" || registerState.phone === ""){
            registerComponent.container.error(`Please fill out all fields`, `Error`, {
                closeButton: true,
            });
            return ;
        }

        if(registerState.password !== registerState.confirmPassword){
            registerComponent.container.error(`Passwords do not match`, `Error`, {
                closeButton: true,
            });
            return ;
        }


        if(registerState.phone.length !== 10){
            registerComponent.container.error(`Please enter a 10 digit phone number`, `Error`, {
                closeButton: true,
            });
            return ;
        }

        if(registerState.password.length < 6){
            registerComponent.container.error(`Please enter a password with at least a length of 6 characters`, `Error`, {
                closeButton: true,
            });
            return ;
        }

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail =  re.test(String(registerState.email).toLowerCase());

        if(!validEmail){
            registerComponent.container.error(`Please enter a valid email`, `Error`, {
                closeButton: true,
            });
            return ;
        }





        setOpen(true);
    }

   

    return (
        <div className={classes.root}>
        {/* <CareAppNav /> */}
        <Box display='flex'>
            <AlertDialogSlide open={open} setOpen={setOpen} alertSlideCallback={slideAlertCallback} title={alertTitle}
                              description={alertDescription} yesOptionTitle={yesOptionTitle}
                              noOptionTitle={noOptionTitle}/>
            
                <FormOne registerComponent={registerComponent}/>
                {/* <FormTwo registerComponent={registerComponent}/> */}
            <div>
            <Button
                variant="contained"
                color="primary"
                onClick={askForConfirmation }
                className={classes.button}
            >
                Finish 
            </Button>
            </div>
            </Box>
        </div>
    );
}


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: "",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            createProvider: false,
            isLoggedIn: false,
        }
    }

    register = async () => {



        let URL = "http://localhost:3000/users";
        // let URL = "http://localhost:3000/users/authenticate";

        this.setState({
            jwt: []
        });


        const response = await axios({
            method: 'post',
            url: URL,
            data: {
                phone: this.state.phone,
                fName: this.state.firstName,
                lName: this.state.lastName,
                title: "No Title",
                active: true,
                admin: false,
                superAdmin: false,
                userType: 1,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.password
            }
        });


        const data = await response.data;
        const user = data.user;
        const msg = data.Message;

        if (msg === "Person created successfully") {
            this.props.setToken(this.state);
        } else {
            console.log("unsuccessfully created user");
        }

    }


    componentDidMount() {
        this.props.setIsHomePage(false);
    }

    render() {
        return !this.props.token ? (
            <div id="registerContainer">
                <ToastContainer
                    ref={ref => this.container = ref}
                    className="toast-bottom-right"
                />
                <FormContainer registerComponent={this}/>
            </div>
        ) : <Redirect to="/provider"/>;
    }
}

export default Register;