import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import "./LandingPage.css";
import {Link, Redirect} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import logo from './PHP.jpg';
import CareAppBar from '../CareAppBar/CareAppBar';
import Copyright from '../Copyright/Copyright';

const useStyles = makeStyles((theme) => ({
    background: {
        height: '100%',
        backgroundColor: "lightgrey"
    },
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        [theme.breakpoints.down('md')]: {
            display: "flex",
            flexDirection: "column",
        },
    },
    mainFeaturedPost: {
        position: 'relative',
        width: "100%",
        color: theme.palette.common.white,
        marginBottom: theme.spacing(2),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        display: "flex",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: "100%",
        height: "100%",

        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        display: "flex",
        flexDirection: "column",
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    sidebarAboutBox: {
        marginTop: 20,
        padding: theme.spacing(2),
        // backgroundColor: theme.palette.grey[200],
    },
    paper: {
        position: 'static',
        padding: theme.spacing(2),
        textAlign: 'left',
    },
    button: {
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center'
    },
    text: {
        fontSize: "1rem",
        [theme.breakpoints.down('md')]: {
            fontSize: "0.8rem",
        },
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    image: {
        display: "none",
        height: "250px",
        width: "100%"
    },
    about: {
        width: "40%",
        padding: "12px",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        },
    },
    login: {
        width: "40%",
        padding: "12px",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        },
    }
}));

const LandingPage = (props) => {
    const classes = useStyles();
    props.setIsHomePage(true);
    return (
        <div className={classes.background}>
            <CareAppBar/>
            <div>
                <Paper className={classes.mainFeaturedPost} style={{backgroundImage: `url(${logo})`}}>
                    {/* Increase the priority of the hero background image */}
                    {<img className={classes.image} src={logo} alt="BackgroundImage"/>}
                    <div className={classes.overlay}/>
                    <Grid container>
                        <Grid item md={6}>
                            <div className={classes.mainFeaturedPostContent}>
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    Care Amarillo
                                </Typography>
                                <br/>
                                <Typography variant="h5" color="inherit" paragraph>
                                    The Community that Supports You
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
                <div className={classes.root}>
                    <div className={classes.about}>
                        <h2>About Care Amarillo</h2>
                        <hr/>
                        <p className={classes.text}>
                            Care Amarillo is an operating system that is accessible to a diverse group of people.
                            This system will be available 24 hours a day, 7 days a week to support the community.
                            Used by human services and emergency shelters this system will make lives better in our
                            community.
                            Information from these different providers will be current and up to date with types of
                            services offered, volunteering information as well as contact and website information.
                        </p>

                        <p className={classes.text}>
                            Emergency shelters provide emergency short-term housing and warming needs. Total number
                            of beds offered by these providers will be updated as beds become available.
                            With quick access and up to date information, clients will be able to see locations that
                            have short term housing, warming stations, food pantries, clothing closets, and beds.
                        </p>

                        <p className={classes.text}>
                            Care Amarillo is about helping the community as a whole, by caring for one another we
                            will all become better members of our great city and become better at building
                            relationships.
                        </p>
                    </div>
                    <div className={classes.login}>
                        <Paper elevation={0} className={classes.sidebarAboutBox}>
                            <Typography variant="h6" gutterBottom className={classes.title}>
                                Provider Administration Login
                            </Typography>
                            <Typography className={classes.text}>Human Service and Emergency Providers use the login
                                button below to access your account. If you do not have an account contact the
                                Administrator to have an account made for you.</Typography>
                            <Button className={classes.button} to="/login" component={Link} variant="contained"
                                    id="loginButton">
                                LOGIN
                            </Button>
                        </Paper>
                    </div>

                </div>
            </div>
            <Copyright/>
        </div>

    )

}
export default LandingPage;
