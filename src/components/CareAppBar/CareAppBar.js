import React, {Component, useEffect, useState} from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Copyright from '../Copyright/Copyright';
import logo from './logo.png';
import axios from "axios";
import Select from 'react-select';
// import './CareAppBar.css';
import {Redirect} from "react-router-dom";



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
    reactSearch:{
        width:"30%",
      // display:'flex',
      // justifyContent: 'end'
    },
    appChildrenContainer:{
        width:"100%",
        // backgroundColor:"black",
      display:'flex',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: 'center',
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
      paddingBottom: 5
    },
}));



const CareAppBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
    const [selectedProvider, setSelectedProvider] = useState("");
  const [providers, setProviders] = useState([]);

// useEffect(() => {
//   loadData().then(r => console.log(""));
// }, []);

const searchChanged = (e) => {
  console.log(`value is ${e}`);
  setSearchQuery(e);
}

const onChange = (e,a) => {
    console.log(`selected provider id is ${JSON.stringify(e)} and ${JSON.stringify(a)}`);
    setSelectedProvider(e.value);
}


const customStyles = {
  option: provided => ({
    ...provided,
    color: 'black'
  }),
  control: provided => ({
    ...provided,
    color: 'black'
  }),
  singleValue: provided => ({
    ...provided,
    color: 'black'
  })
}

useEffect(() => {
  
  loadData().then(r => console.log(""));
}, [searchQuery]);

;

const loadData = async () => {
  console.log(`loaddata val is ${searchQuery}`);
  let URL = "http://localhost:3000/providersActive";

        const response = await axios({
            method: 'get',
            url: URL,
            params:{
               searchQuery: searchQuery
            }
        });

        const data = await response.data;
        console.log(`data is ${data}`);
        
        let tempData = [];
        for(let obj in data){
          console.log(`obj data is ${JSON.stringify(data[obj])}`);
          let actualObj = data[obj];
          let val = actualObj._id;
          let label = actualObj.name;
          tempData.push({value: val, label: label});
        }
        setProviders(tempData);
        // setProviders(data);
        return data;
}
      const classes = useStyles();
    return (
       selectedProvider === "" ? <div className={classes.root}>
            <AppBar  style={{ backgroundColor: "#132C3C" }} position="fixed">
                <Toolbar>
                  <div className={classes.appChildrenContainer}>
                      <img src={logo} className={classes.logo} />
                      <div className={classes.reactSearch}>
                            <Select onInputChange={searchChanged} onChange={onChange} value={selectedProvider}  placeholder='Search for Shelter...' autosize={false} options={providers} styles={customStyles} components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }} />
                      </div>
                  </div>
                    {/* <div className={classes.searchBox}>
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
                      </div> */}
                </Toolbar>
            </AppBar>
            <div/>
        </div>: <Redirect to={`/providerDtl/${selectedProvider}`}/>
    );
}

export default CareAppBar;