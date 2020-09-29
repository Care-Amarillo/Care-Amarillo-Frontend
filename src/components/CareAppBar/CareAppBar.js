import React, {Component} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Copyright from '../Copyright/Copyright';
import logo from './logo.png';
import axios from "axios";
import { CardMedia } from '@material-ui/core';
// import './CareAppBar.css';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    searchBox: {
      marginLeft: 870
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      // transition: theme.transitions.create('width'),
      // width: '100%',
      // [theme.breakpoints.up('sm')]: {
      //   width: '12ch',
      //   '&:focus': {
      //     width: '20ch',
      //   },
      // },
    },
    logo : {
      maxWidth: 160,
      paddingTop: 5,
      paddingLeft: 20,
    },
}));

const CareAppBar = () => {
// class CareAppBar extends Component() {
//   constructor(props) {
//     super(props);
//     this.state = {
//       providers: [],
//       searchQuery: ""
//     }
  // }
//   componentDidMount() {
//     this.loadData();

// }

// searchChanged = (e) => {
//     this.setState({
//         searchQuery: e.target.value
//     }, ()=>{
//        this.loadData();
//     })

// }
// loadData = async () => {
//   let URL = "http://localhost:3000/providersActive";
        


//         const response = await axios({
//             method: 'get',
//             url: URL,
//             params:{
//                searchQuery: this.state.searchQuery
//             }

//         });


//         const data = await response.data;

//         this.setState({
//             providers: data
//         });
// }
    // render() {
      const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar  style={{ backgroundColor: "#132C3C" }} position="fixed">
                <Toolbar>
                  <CardMedia>
                    <img src={logo} className={classes.logo} />
                  </CardMedia>
                    <div className={classes.searchBox}>
                      <div className={classes.search}>
                          <div className={classes.searchIcon}>
                              <SearchIcon />
                          </div>
                          <InputBase
                              placeholder="Search Shelter..."
                              classes={{
                                  root: classes.inputRoot,
                                  input: classes.inputInput,
                              }}
                              // onChange={this.searchChanged}
                              inputProps={{'area-label': 'search'}}
                              />
                      </div>
                      </div>
                </Toolbar>
                {/* <Button onClick={props.loginClicked} variant="contained" id="loginButton" >
                    Login
                </Button> */}
                
            </AppBar>
            <div/>
        </div>
    );
    // }
}

export default CareAppBar;