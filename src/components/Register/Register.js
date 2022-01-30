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
import Providers from "../Providers/Providers";
import RegisterDialog from "./RegisterDialog";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
            width: '25ch',
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
}));

const getSteps = () => {
    return ['Choose Provider','Personal Info', 'Login Info'];
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
    return <form className={classes.form} noValidate autoComplete="off">
        <TextField id="firstName" label="First Name" onChange={onChangeFirstName} variant="outlined" value={registerComponent.state.firstName}/>
        <TextField id="lastName" label="Last Name" value={registerComponent.state.lastName} onChange={onChangeLastName} variant="outlined"/>
        <TextField id="phone" label="Phone Number"  inputProps={{ maxLength: 10 }} onInput={(e)=>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
        }} onChange={onChangePhone} type="number" value={registerComponent.state.phone} variant="outlined"/>
    </form>;
}


const ProviderForm = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;
    const setOpen = props.setOpen;

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

    const openProvider = (e) => {
        // console.log("open provider")
      setOpen(true);
    };

    // console.log(`registerComponent states ${JSON.stringify(registerComponent.state.providers)}`)
    // console.log(`registerComponent states ${registerComponent.state.providers.length}`)

    return <form className={classes.form} noValidate autoComplete="off">
        <Button color="primary" onClick={() => openProvider()} className={classes.button}>
            {registerComponent.state.chosenProvider == null ? "Choose Provider" : registerComponent.state.chosenProvider.name}
        </Button>
        {/*{registerComponent.state.providers.map((data, index) => (*/}
        {/*    <Providers key={index} index={index} data={data}/>*/}
        {/*))}*/}
    </form>;
}

const FormTwo = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;

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
    return <form className={classes.form} noValidate autoComplete="off">
        <TextField id="email" label="Email" value={registerComponent.state.email} onChange={onChangeEmail} variant="outlined"/>
        <TextField id="password" label="Password" value={registerComponent.state.password} onChange={onChangePass} type="password" variant="outlined"/>
        <TextField id="confirmPassword" label="Confirm Password" value={registerComponent.state.confirmPassword} onChange={onChangeConfirmPass} type="password"
                   variant="outlined"/>
    </form>;
}

const getStepContent = (step, registerComponent, setOpenProvider, openProvider) => {
    switch (step) {
        case 0:
            return <ProviderForm registerComponent={registerComponent} setOpen={setOpenProvider} open={openProvider}/>;
        case 1:
            return <FormOne registerComponent={registerComponent}/>;
        case 2:
            return <FormTwo registerComponent={registerComponent}/>;
        default:
            return 'Unknown step';
    }
}


const HorizontalLinearStepper = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();
    const registerComponent = props.registerComponent;
    const registerState = registerComponent.state;
    const [open, setOpen] = React.useState(false);
    const [openProviders, setOpenProviders] = React.useState(false);
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


    const isStepOptional = (step) => {
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const slideAlertCallback = (isTrue) => {
        if (isTrue) {
            registerComponent.register();
        } else {
            // console.log("is false");
        }
    }


    const providerRegisterCallback = (provider) => {
        if (provider) {
            registerComponent.setState({
                chosenProvider: provider,
            });
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


        if(registerState.chosenProvider == null){
            registerComponent.container.error(`Please choose a provider`, `Error`, {
                closeButton: true,
            });
            return ;
        }


        setOpen(true);
    }

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <AlertDialogSlide open={open} setOpen={setOpen} alertSlideCallback={slideAlertCallback} title={alertTitle}
                              description={alertDescription} yesOptionTitle={yesOptionTitle}
                              noOptionTitle={noOptionTitle}/>
            <RegisterDialog open={openProviders} setOpen={setOpenProviders} providerDialogCallback={providerRegisterCallback}/>
            <Stepper activeStep={activeStep} nonLinear orientation={"horizontal"}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            Double Check Your Information
                            <div id="doubleCheckInfo">
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
                            </div>
                        </Typography>


                        <Button color="primary" onClick={() => registerComponent.register()} className={classes.button}>
                            Register
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography
                            className={classes.instructions}>{getStepContent(activeStep, registerComponent, setOpenProviders, open)}</Typography>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>


                            <Button
                                variant="contained"
                                color="primary"
                                onClick={activeStep === steps.length - 1 ? askForConfirmation : handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
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
            searchQuery: "",
            phone: "",
            email: "",
            password: "",
            createProvider: false,
            chosenProvider: null,
            providers: [],
            isLoggedIn: false,
        }
    }


    loadData = async () => {


        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/providersActive`;



        const response = await axios({
            method: 'get',
            url: URL,
            params:{
                searchQuery: this.state.searchQuery
            }

        });


        const data = await response.data;
        // console.log("providers data: " + JSON.stringify((data)));

        this.setState({
            providers: data
        });

    }


    register = async () => {



        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/provider/${this.state.chosenProvider._id}`;

        this.setState({
            jwt: []
        });

        const config = {
            "Authorization": `Bearer ${this.props.token}`
        };


        const response = await axios({
            method: 'post',
            url: URL,
            data: {
                phone: this.state.phone,
                fName: this.state.firstName,
                lName: this.state.lastName,
                title: "No Title",
                active: true,
                admin: true,
                superAdmin: false,
                userType: 1,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.password
            },
            headers: config

        });


        const data = await response.data;
        const user = data.user;
        const msg = data.Message;

        if (msg === "Person created successfully") {
            this.container.success(`Successfully linked user with provider`, `Success`, {
                closeButton: true,
            });
        } else {
            // console.log("unsuccessfully created user");
        }

    }


    componentDidMount() {
        this.loadData();
    }

    render() {
        return  (
            <div id="registerContainer">
                <ToastContainer
                    ref={ref => this.container = ref}
                    className="toast-bottom-right"
                />
                <HorizontalLinearStepper registerComponent={this}/>
            </div>
        ) ;
    }
}

export default Register;
