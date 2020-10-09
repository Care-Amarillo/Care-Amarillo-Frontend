import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './EditUser.css';
import axios from "axios";
import AlertDialogSlide from "../AlertDialogSlide";
import {ToastContainer} from "react-toastr";
import {createMuiTheme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: "5%",
        marginRight: theme.spacing(1),
        backgroundColor: "#132C3C",
        color: "white",
        '&:disabled': {
            backgroundColor: "lightgrey"
        },
        '&:hover': {
            backgroundColor: "#132C3C",
            color: '#FFFFFF'
        }
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    formContainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-evenly",
        alignItems:"center",
        [theme.breakpoints.down('md')]: {
            display:"flex",
            flexDirection:"column-reverse"
        },

    },
    form: {
        '& > *': {
            margin: theme.spacing(2),
            width: '35ch',
        },
        display: "flex",
        flexDirection: "column",
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        display: 'flex',
        // marginLeft: "60%",
        marginTop: "5%"
    },
}));


const FormOne = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;

    const onChangeFirstName = (e) => {
        registerComponent.setState({
            fName: e.target.value,
        });
    };

    const onChangeLastName = (e) => {
        registerComponent.setState({
            lName: e.target.value,
        });
    };

    const onChangeEmail = (e) => {
        registerComponent.setState({
            email: e.target.value,
        });
    };

    const onChangePhone = (e) => {
        registerComponent.setState({
            phone: e.target.value,
        });
    };


    return <div className={classes.formContainer}>
        <form className={classes.form} noValidate autoComplete="off">
            <TextField id="firstName" label="First Name" value={registerComponent.state.fName}
                       onChange={onChangeFirstName}
                       variant="outlined"/>
            <TextField id="lastName" label="Last Name" onChange={onChangeLastName} value={registerComponent.state.lName}
                       variant="outlined"/>
            <TextField id="email" label="Email" onChange={onChangeEmail} value={registerComponent.state.email}
                       variant="outlined"/>
            <TextField id="phone" label="Phone Number" onChange={onChangePhone} value={registerComponent.state.phone}
                       type="number" variant="outlined"/>

        </form>
        <Avatar  alt="userAvatar" src="" className={classes.large} />
    </div>;
}


const HorizontalLinearStepper = (props) => {
    const classes = useStyles();
    const registerComponent = props.registerComponent;
    const registerState = registerComponent.state;
    const [open, setOpen] = React.useState(false);
    const alertTitle = "Are You Sure?";
    const yesOptionTitle = "Yes";
    const noOptionTitle = "Cancel";

    const alertDescription = <div>
            <div>
                First Name: {registerState.fName}
            </div>
            <div>
                Last Name: {registerState.lName}
            </div>
            <div>
                Phone: {registerState.phone}
            </div>
            <div>
                Email: {registerState.email}
            </div>
        </div>


    ;


    const slideAlertCallback = (isTrue) => {
        if (isTrue) {
            registerComponent.updateUser();
        } else {
        }
    }

    const askForConfirmation = () => {
        setOpen(true);
    }

    return (
        <div className={classes.root}>
            <AlertDialogSlide open={open} setOpen={setOpen} alertSlideCallback={slideAlertCallback} title={alertTitle}
                              description={alertDescription} yesOptionTitle={yesOptionTitle}
                              noOptionTitle={noOptionTitle}/>
            <div>
                <FormOne registerComponent={registerComponent}/>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={askForConfirmation}
                    className={classes.button}
                >
                    Update
                </Button>

            </div>
        </div>
    );
}


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jwt: "",
            fName: "",
            lName: "",
            phone: "",
            email: "",
        }
    }

    updateUser = async () => {
        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/` + this.props.user._id;


        const config = {
            "Authorization": `Bearer ${this.props.token}`
        };

        const response = await axios({
            method: 'put',
            url: URL,
            data: {
                phone: this.state.phone,
                fName: this.state.fName,
                lName: this.state.lName,
                email: this.state.email,
            },
            headers: config

        });


        const data = await response.data;
        const user = data.user;
        const msg = data.Message;

        if (msg === "Updated User successfully") {
            this.container.success(`Profile Updated`, `Success`, {
                closeButton: true,
            });
            this.props.setUser(user);
        } else {
            console.log("unsuccessfully updated user");
        }

    }


    componentDidMount() {
        this.setState({
            fName: this.props.user.fName,
            lName: this.props.user.lName,
            phone: this.props.user.phone,
            email: this.props.user.email,
        })
    }

    render() {
        return <div id="registerContainer">
            <ToastContainer
                ref={ref => this.container = ref}
                className="toast-bottom-right"
            />
            <HorizontalLinearStepper registerComponent={this}/>
        </div>;
    }
}

export default EditProfile;