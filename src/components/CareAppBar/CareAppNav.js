import React, { useEffect, useState } from 'react';
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import CareAppDrawer from "../../containers/CareAppDrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronLeft';
import ChevronLeftIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select';
import axios from "axios";
import {Redirect} from "react-router-dom";


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    reactSearch:{
        // display: 'flex',
        marginLeft: 605,
        width:"25%",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        // [theme.breakpoints.up("sm")]: {
        //     width: drawerWidth,
        //     flexShrink: 0
        // }
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    // Strickly the app bar on top makes it touch end to end. When Drawer is closed.
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // marginLeft: drawerWidth,
        // [theme.breakpoints.up("sm")]: {
        //     width: `calc(100% - ${drawerWidth}px)`
        // },
        // backgroundColor: "#132C3C",
    },

    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36
        // marginRight: theme.spacing(2),
        // [theme.breakpoints.up("sm")]: {
        //     display: "none"
        // }
    },
    hide: {
        display: 'none',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    // toolbar: theme.mixins.toolbar,
    // drawerPaper: {
    //     width: drawerWidth
    // },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));



// simply write a function in ES6+ then pass in the keyword props to access this special object
const CareAppNav = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProvider, setSelectedProvider] = useState("");
    const [providers, setProviders] = useState([]);


    const classes = useStyles();
    // every component in React MUST return something...
    // notice the ( ) after the return. This is called an implicit return
    const { container } = props;
    const theme = useTheme();

    // Allows the drawer to open and close
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    }

    const handleDrawerToggle = () => {
        console.log("handle drawer toggle");
        // setMobileOpen(!mobileOpen);
        props.setOpen(!props.mobileOpen);
    };

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


    // todo: maybe change to functional component
    const appBar = (
        selectedProvider === "" ? <div>
            <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open, })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerOpen}
                        // onClick={handleDrawerToggle}
                        className={clsx(classes.menuButton, {[classes.hide]: open, })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Care Amarillo
                    </Typography>
                    <div className={classes.reactSearch}>
                        <Select onInputChange={searchChanged} onChange={onChange} value={selectedProvider}  placeholder='Search for Shelter...' autosize={false} options={providers} styles={customStyles} components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }} />
                    </div>
                </Toolbar>
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
            </AppBar>
        </div> : <Redirect to={`/providerDtl/${selectedProvider}`}/>
    );

    return (!props.isHomePage ?

            <div className={classes.root}>
                {appBar}
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    {/* <Hidden smUp implementation="css"> */}
                    <Drawer
                        // container={container}
                        // variant="temporary"
                        // anchor={theme.direction === "rtl" ? "right" : "left"}
                        // open={props.mobileOpen}
                        // onClose={handleDrawerToggle}
                        // classes={{
                        //     paper: classes.drawerPaper
                        // }}
                        // ModalProps={{
                        //     keepMounted: true // Better open performance on mobile.
                        // }}
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <CareAppDrawer/>
                    </Drawer>
                    {/* </Hidden>
              <Hidden xsDown implementation="css"> */}
                    {/* <Drawer
                      classes={{
                          paper: classes.drawerPaper
                      }}
                      variant="permanent"
                      open
                  >
                      <CareAppDrawer/>
                  </Drawer> */}
                    {/* </Hidden> */}
                </nav>
            </div> : <div></div>

    )
}

// Then, because we want to compose our web pages with composable elements we have to export the code in the file. Always write this line at then end of your .js files:
export default CareAppNav