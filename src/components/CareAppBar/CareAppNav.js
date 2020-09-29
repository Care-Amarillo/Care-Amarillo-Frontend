import React from 'react';
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
import { CssBaseline } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronLeft';
import ChevronLeftIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
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
    const classes = useStyles();
    // every component in React MUST return something...
    // notice the ( ) after the return. This is called an implicit return
    const { container } = props;
    const theme = useTheme();

    // Allows the drawer to open and close
    const [open, setOpen] = React.useState(false);
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


    // todo: maybe change to functional component
    const appBar = (
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
            </Toolbar>
        </AppBar>
    );

    return (
        <div className={classes.root}>
          <CssBaseline />
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
        </div>
    )
}

// Then, because we want to compose our web pages with composable elements we have to export the code in the file. Always write this line at then end of your .js files:
export default CareAppNav