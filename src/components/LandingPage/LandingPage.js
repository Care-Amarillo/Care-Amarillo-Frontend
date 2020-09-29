import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    root: {
        marginLeft: 30,
        marginRight: 30
    },
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
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
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
    },
    paper: {
        position: 'static',
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    button: {
        backgroundColor: "#132C3C",
        marginTop: 30,
        marginLeft: 200
    }
  }));

const LandingPage = (props) => {
    const classes = useStyles();
    return (
        <div>
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
                        <Typography variant="h5" color="inherit" paragraph>
                        "Values | Saying | Quote"
                        </Typography>
                    </div>
                    </Grid>
                </Grid>
            </Paper>
            <div className={classes.root}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={7}  className={classes.paper}>
                <h2>About</h2>
                <hr />
                <p>
                Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.

                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

                Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
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
            </div>
            <Copyright />
        </div>
        
    )   
    
}
export default LandingPage;