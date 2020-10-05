import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "./LandingPage.css";
import { Link, Redirect } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import logo from './PHP.jpg';
import CareAppBar from '../CareAppBar/CareAppBar';
import Copyright from '../Copyright/Copyright';

const useStyles = makeStyles((theme) => ({
    background: {
        // paddingBottom: '100%',
    },
    root: {
        marginLeft: 150,
        marginRight: 150,
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(2),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
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
        backgroundColor: theme.palette.grey[200],
    },
    paper: {
        position: 'static',
        padding: theme.spacing(2),
        textAlign: 'left',
        // color: theme.palette.text.secondary,
    },
    button: {
        backgroundColor: "#132C3C",
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center'
        // marginLeft: 200
    },
    text: {
        fontSize: "1rem",
        color: 'black'
    }
}));

const LandingPage = (props) => {
    const classes = useStyles();
    props.setIsHomePage(true);
    return (
        <div className={classes.background}>
            <CareAppBar />
            <div>
                <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${logo})` }}>
                    {/* Increase the priority of the hero background image */}
                    {<img style={{ display: 'none' }} src={logo} alt="BackgroundImage" />}
                    <div className={classes.overlay} />
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
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={7} className={classes.paper}>
                            <h2>About Care Amarillo</h2>
                            <hr />
                            <p>
                                Care Amarillo is an operating system that is accessible to a diverse group of people.  This system will be available 24 hours a day, 7 days a week to support the community.
                                Used by human services and emergency shelters this system will make lives better in our community.
                                Information from these different providers will be current and up to date with types of services offered, volunteering information as well as contact and website information.
                            </p>

                            <p>
                                Emergency shelters provide emergency short-term housing and warming needs.  Total number of beds offered by these providers will be updated as beds become available.
                                With quick access and up to date information, clients will be able to see locations that have short term housing, warming stations, food pantries, clothing closets, and beds.
                            </p>
                            
                            <p>
                                Care Amarillo is about helping the community as a whole, by caring for one another we will all become better members of our great city and become better at building relationships.
                            </p>
                        </Grid>
                        <Grid item xs={12} md={5} className={classes.paper}>
                            <Paper elevation={0} className={classes.sidebarAboutBox}>
                                <Typography variant="h6" gutterBottom>
                                    Mission Statement
                        </Typography>
                                <Typography>Etiam porta sem malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod.</Typography>
                            </Paper>
                            <Button className={classes.button} to="/login" component={Link} variant="contained" id="loginButton">
                                LOGIN
                    </Button>
                        </Grid>
                    </Grid>
                </div>
                </Grid>
            </Paper>
            <div className={classes.root}>
            <Grid container spacing={5}>
            <Grid item xs={12} md={7}  className={classes.paper}>
                <h2>About Care Amarillo</h2>
                <hr />
                <p className={classes.text}>
                Care Amarillo system is a high-level system that allows the search and registration of human services and emergency shelter information. This system is designed for those who utilize such resources as well as those that provide those resources.
                <br />
                <br />
                To better our community as a whole, Care Amarillo makes it easy for everyone to use. 
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                <br />
                <br />
                Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                </p>
            </Grid>
                <Grid item xs={12} md={5} className={classes.paper}>
                    <Paper elevation={0} className={classes.sidebarAboutBox}>
                        <Typography variant="h6" gutterBottom>
                        Providers Login Below
                        </Typography>
                        <Typography>Etiam porta sem malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod.</Typography>
                        <Button className={classes.button} to="/login" component={Link} variant="contained" id="loginButton">
                        LOGIN
                    </Button>
                    </Paper>
                </Grid>
            </Grid>
            </div>
            </div>
            <Copyright />
        </div>

    )

}
export default LandingPage;
