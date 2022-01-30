import React, {Component} from 'react';
import './ProviderDetail.css';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    Link
} from "react-router-dom";
import axios from "axios";
import {ToastContainer} from "react-toastr";
import * as firebase from "firebase/app"
import "firebase/messaging";
import {messaging} from "../../init-fcm";


const mapApiKey = process.env.REACT_APP_MAP_API_KEY;

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        // justifyContent:"center",
        margin: "10px",
        width: "60%"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 17,
        textAlign: "start",
        fontWeight: "bold"
    },
    secondText: {
        textAlign: "start"
    },
    sound: {
        width: "100%"
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#132C3C",
        color: "white",
        '&:hover': {
            backgroundColor: "lightgrey",
            color: '#000000'
        }
    }
});

const ProviderMap = (props) => {
    const data = props.data;


    if (!data) {
        return <div></div>;
    }

    let lat = "0.0";
    let long = "0.0";
    let place_id = data.place_id;
    if (data.long && data.lat) {
        lat = data.lat;
        long = data.long;
    }

    if (lat === "0.0" && long === "0.0") {
        return <div></div>;
    }

    let mapSrc = `https://www.google.com/maps/embed/v1/place?q=${lat},${long}&key=${mapApiKey}`;
    if (place_id !== "") {
        mapSrc = `https://www.google.com/maps/embed/v1/place?q=place_id:${place_id}&key=${mapApiKey}`;
    }


    let mapIframe = <iframe width="100%" height="450" frameborder="0"
                            src={mapSrc} allowfullscreen></iframe>;


    return mapIframe;
}

const ProviderDtlCard = (props) => {
    const classes = useStyles();

    const data = props.data;
    const title = data.title;
    const name = data.name;
    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>
                    {name}
                </Typography>
                <Typography className={classes.secondText}>
                    {title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" className={classes.button}>
                    <Link className="barLink" to={{
                        pathname: "/providerDtl",
                        state: {
                            data: data
                        }
                    }}>Learn More</Link>
                </Button>
            </CardActions>
        </Card>
    )
}

const ProviderDtlPhoneCard = (props) => {
    const classes = useStyles();

    const data = props.data;
    const phone = data.phone;
    const href = `tel:${phone}`;
    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>
                    Phone
                </Typography>
                <Typography className={classes.secondText}>
                    {phone}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" className={classes.button}>
                    <a id="dtlLink" href={href}>CALL US!</a>
                </Button>
            </CardActions>
        </Card>
    )
}


const ProviderDtlFavoriteCard = (props) => {
    const classes = useStyles();

    const handlePushSub = () => {

        //todo: actually check if subscribed and use push manager
        if (props.pushSubscribed) {
            props.handlePushSubscribed(false);
        } else {
            props.handlePushSubscribed(true);
        }

        if (firebase.messaging.isSupported()) {
            messaging.requestPermission()
                .then(async function () {
                    const token = await messaging.getToken();
                    //todo: also handle token refresh, code in function below
                    // console.log("token is " + token);
                    if (!props.pushSubscribed) {
                        props.handleNewPushToken(token);
                    }

                    // props.container.success(`Your have subscribed to receive push notifications`, `Success`, {
                    //     closeButton: true,
                    // });
                })
                .catch(function (err) {
                    // console.log("Unable to get permission to notify.", err);
                });
            messaging.onMessage(function (payload) {
                // console.log("Message received. ", payload);
                //todo: use this with below code for swReg
                navigator.serviceWorker.getRegistration('./firebase-messaging-sw.js').then(registration => {
                    registration.showNotification(
                        payload.notification.title,
                        payload.notification
                    )
                });
                // ...
            });

            navigator.serviceWorker.addEventListener("message", (message) => console.log(""));
        } else {
            props.container.warning(`Your browser doesn't support push notifications`, `Sorry`, {
                closeButton: true,
            });
        }
    }

    const registerPush = async () => {
        const messaging = firebase.messaging();
        // Add the public key generated from the console here.
        messaging.usePublicVapidKey(
            "BAbQqzrfIWAgTvVnNJVrJvyEoUrh2uBtDYx2iT3cbW5JfKEHJFRn3Ruyjs4H9OsD1rjYDCQRR2UAO_46anL8Sgk"
        );

        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging
            .getToken()
            .then(currentToken => {
                // console.log("currentToken is " + currentToken);
                if (currentToken) {
                    // sendTokenToServer(currentToken);
                    // updateUIForPushEnabled(currentToken);
                } else {
                    // Show permission request.
                    // console.log(
                    //     "No Instance ID token available. Request permission to generate one."
                    // );
                    // Show permission UI.
                    // updateUIForPushPermissionRequired();
                    // setTokenSentToServer(false);
                }
            })
            .catch(err => {
                // console.log("An error occurred while retrieving token. ", err);
                // showToken('Error retrieving Instance ID token. ', err);
                // setTokenSentToServer(false);
            });

        messaging.onMessage(function (payload) {
            // console.log("Message received. ", payload);
            // ...
        });

        let isSubscribed = false;
        let swRegistration = null;

        if ("serviceWorker" in navigator && "PushManager" in window) {
            // console.log("Service Worker and Push is supported");

            let applicationServerPublicKey =
                "BAbQqzrfIWAgTvVnNJVrJvyEoUrh2uBtDYx2iT3cbW5JfKEHJFRn3Ruyjs4H9OsD1rjYDCQRR2UAO_46anL8Sgk";
            //use code above to complete
            // swRegistration = props.swReg;
            swRegistration = null;
            const applicationServerKey = urlB64ToUint8Array(
                applicationServerPublicKey
            );
            swRegistration.pushManager
                .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: applicationServerKey
                })
                .then(function (subscription) {
                    // console.log("User is subscribed." + subscription);

                    // updateSubscriptionOnServer(subscription);
                    Notification.requestPermission().then(permission => {
                        if (permission === "granted") {
                            // console.log("Notification permission granted.");
                            // TODO(developer): Retrieve an Instance ID token for use with FCM.
                            // [START_EXCLUDE]
                            // In many cases once an app has been granted notification permission,
                            // it should update its UI reflecting this.
                            //   resetUI();
                            // [END_EXCLUDE]
                        } else {
                            // console.log("Unable to get permission to notify.");
                        }
                    });

                    // isSubscribed = true;

                    // updateBtn();
                })
                .catch(function (err) {
                    // console.log("Failed to subscribe the user: ", err);
                    // updateBtn();
                });


        } else {
            // console.warn("Push messaging is not supported");
            // pushButton.textContent = 'Push Not Supported';
        }

        function urlB64ToUint8Array(base64String) {
            const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, "+")
                .replace(/_/g, "/");

            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }
    }

    const data = props.data;
    const name = data.name;

    let buttonToShow = props.pushSubscribed ?
        <Button variant="contained" className={classes.button} onClick={() => handlePushSub()}>
            UNSUBSCRIBE
        </Button> : <Button variant="contained" className={classes.button} onClick={() => handlePushSub()}>
            SUBSCRIBE
        </Button>;

    let buttonDataToShow = props.user != null ? buttonToShow :
        <div>Must be signed in to subscribe to push notifications</div>;

    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>
                    Subscribe
                </Typography>
                <Typography className={classes.secondText}>
                    Subscribe to {name} to get instant push updates
                </Typography>
            </CardContent>
            <CardActions>
                {buttonDataToShow}
            </CardActions>
        </Card>
    )
}


const ProviderDtlEmailCard = (props) => {
    const classes = useStyles();

    const data = props.data;
    const email = data.email;
    const href = `mailto:${email}`;
    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>
                    Email
                </Typography>
                <Typography className={classes.secondText}>
                    {email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" className={classes.button}>
                    <a id="dtlLink" href={href}>EMAIL US!</a>
                </Button>
            </CardActions>
        </Card>
    )
}


const ProviderDtlVacancyCard = (props) => {
    const classes = useStyles();

    const data = props.data;
    const bedsUsed = data.bedsUsed;
    const totalBeds = data.totalBeds;
    let services = "";
    if(data["services"]){
        services = data.services;
    }
    const availableBeds = totalBeds - bedsUsed;
    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>
                    Available Beds/Rooms
                </Typography>
                <Typography className={classes.secondText}>
                    {availableBeds}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography className={classes.title}>
                    Services
                </Typography>
                <Typography className={classes.secondText}>
                    {services}
                </Typography>
            </CardContent>
            <CardActions>
                {/*<Button size="small" color="primary">*/}
                {/*    <a href={href}>EMAIL US!</a>*/}
                {/*</Button>*/}
            </CardActions>
        </Card>
    )
}

const ProviderDtlShareCard = (props) => {
    const classes = useStyles();


    const data = props.data;
    const name = data.name;
    const currentUrl = window.location.href;

    const shareProvider = () => {
        navigator.clipboard.writeText(currentUrl);

        props.container.success(`Link Copied To Clipboard`, `Success`, {
            closeButton: true,
        });

    }

    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>
                    Share {name}
                </Typography>
                <Typography className={classes.secondText}>
                    Get a link to share {name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => shareProvider()} variant="contained" className={classes.button}>
                    Share!
                </Button>
            </CardActions>
        </Card>
    )
}

const isIOSDevice = () => {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

const ProviderDtlAddressCard = (props) => {
    const classes = useStyles();

    const data = props.data;
    const address = data.address;
    const lat = data.lat;
    const long = data.long;


    const appleDrivingDirections = `https://maps.apple.com/?q=${lat},${long}`;
    const androidDrivingDirections = `google.navigation:q=${lat},${long}`;
    const webDrivingDirections = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;

    let directionsToUse = webDrivingDirections;

    if (isIOSDevice()) {
        directionsToUse = appleDrivingDirections;
    }

    let directionComponent = <div></div>;

    if (lat !== "0.0" && long !== "0.0") {
        directionComponent = <Button variant="contained" className={classes.button}>
            <a id="dtlLink" target="_blank" href={directionsToUse}>GET DIRECTIONS</a>
        </Button>;
    }


    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>
                    Address
                </Typography>
                <Typography className={classes.secondText}>
                    {address}
                </Typography>
            </CardContent>
            <CardActions>
                {directionComponent}
            </CardActions>
        </Card>
    )
}

class ProviderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            pushSubscribed: false,
            id: null,
            container: null
        }
    }



    componentDidMount() {
        this.props.setIsHomePage(false);

        const id = this.props.match.params.id;

        let pushId = "";
        let subscribedToPush = false;

        if (this.props.user) {
            pushId = this.props.user.pushId;
            // console.log("pushId is " + pushId);
            if (pushId !== "") {
                subscribedToPush = true;
            }
        }
        this.setState({
            // data: this.props.location.state.data,
            id: id,
            pushSubscribed: subscribedToPush
        }, () => {
            this.loadData();
        });
    }

    handleNewPushToken = async (pushToken) => {

        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/` + this.props.user._id;


        const config = {
            "Authorization": `Bearer ${this.props.token}`
        };

        const response = await axios({
            method: 'put',
            url: URL,
            data: {
                pushId: pushToken,
            },
            headers: config

        });


        const data = await response.data;
        const user = data.user;
        const msg = data.Message;

        if (msg === "Updated User successfully") {

            this.props.setUser(user);
        } else {
            // console.log("unsuccessfully updated user");
        }

    }

    handlePushSubscribed = (isSubscribed) => {
        this.setState({
            pushSubscribed: isSubscribed
        });
        if (isSubscribed) {
            this.state.container.success(`Your have subscribed to receive push notifications`, `Success`, {
                closeButton: true,
            });
        } else {
            this.state.container.success(`Your have unsubscribed from push notifications`, `Success`, {
                closeButton: true,
            });
            this.handleNewPushToken("");

        }
    }


    loadData = async () => {

        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/providers/` + this.state.id;

        const response = await axios({
            method: 'get',
            url: URL,
        });

        const data = await response.data;

        this.setState({
            data: data
        });

    }

    render() {
        return (
            <div id="providerDtlContainer">
                <ToastContainer
                    ref={ref => this.state.container = ref}
                    className="toast-bottom-right"
                />
                <h1>
                    {this.state.data.name}
                </h1>
                <div id="cardContainer">
                    <ProviderDtlPhoneCard data={this.state.data}/>
                    <ProviderDtlEmailCard data={this.state.data}/>
                    <ProviderDtlAddressCard data={this.state.data}/>
                </div>
                <div id="cardContainer">
                    <ProviderDtlVacancyCard data={this.state.data}/>
                    <ProviderDtlShareCard data={this.state.data} container={this.state.container}/>
                    <ProviderDtlFavoriteCard data={this.state.data} user={this.props.user}
                                             handlePushSubscribed={this.handlePushSubscribed}
                                             handleNewPushToken={this.handleNewPushToken}
                                             pushSubscribed={this.state.pushSubscribed}
                                             container={this.state.container}/>
                </div>
                <div>
                    <ProviderMap data={this.state.data}/>
                </div>

            </div>
        );
    }
}

export default ProviderDetail;
