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
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        backgroundColor: "#132C3C",


    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
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
        // console.log("handle drawer toggle");
        // setMobileOpen(!mobileOpen);
        props.setOpen(!props.mobileOpen);
    };

    const searchChanged = (e) => {
        // console.log(`value is ${e}`);
        setSearchQuery(e);
    }

    const onChange = (e,a) => {
        // console.log(`selected provider id is ${JSON.stringify(e)} and ${JSON.stringify(a)}`);
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


    const loadData = async () => {
        // console.log(`loaddata val is ${searchQuery}`);
        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/providersActive`;

        const response = await axios({
            method: 'get',
            url: URL,
            params:{
                searchQuery: searchQuery
            }
        });

        const data = await response.data;
        // console.log(`data is ${data}`);

        let tempData = [];
        for(let obj in data){
            // console.log(`obj data is ${JSON.stringify(data[obj])}`);
            let actualObj = data[obj];
            let val = actualObj._id;
            let label = actualObj.name;
            tempData.push({value: val, label: label});
        }
        setProviders(tempData);
        // setProviders(data);
        return data;
    }


    const appBar = (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Care Amarillo
                </Typography>
            </Toolbar>
        </AppBar>
    );
    return (!props.isHomePage ?


            <div>
                {appBar}
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === "rtl" ? "right" : "left"}
                            open={props.mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            ModalProps={{
                                keepMounted: true // Better open performance on mobile.
                            }}
                        >
                            <CareAppDrawer/>

                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="permanent"
                            open
                        >
                            <CareAppDrawer/>
                        </Drawer>
                    </Hidden>
                </nav>
            </div>:<div></div>
    )
}

// Then, because we want to compose our web pages with composable elements we have to export the code in the file. Always write this line at then end of your .js files:
export default CareAppNav
