import React from 'react';
import Store from "@material-ui/icons/Store";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Home from "@material-ui/icons/Home";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import TableChartIcon from '@material-ui/icons/TableChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Login from '../../containers/Login';
import LandingPage from '../../containers/LandingPage';
import SuperAdminProviderEntries from '../../containers/SuperAdminProviderEntries';
import Profile from '../../containers/EditUser';
import EditProvider from '../../containers/EditProvider';
import ProviderEntries from '../../containers/ProviderEntries';
import { Provider } from 'react-redux';
import SuperAdminProviders from '../../containers/SuperAdminProviders';
import AuditEntries from '../../containers/AuditEntries';
import SuperAdminUsers from '../../containers/SuperAdminUsers';


const drawerWidth = 250;

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
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    logo:{
        width:"70px",
        height:"50px",
        margin: "auto",
        [theme.breakpoints.down('md')]: {
            width:"50px",
            height:"30px",
        },
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
    }
}));

const HomeListItem = (props) => {
    return  <ListItem button key={LandingPage} onClick={()=>props.handleClick()} component={Link} to={"/"}>
        <ListItemIcon>{<Home />}</ListItemIcon>
        <ListItemText>HOME</ListItemText>
    </ListItem>
}

const LoginListItem = (props) => {
    return <ListItem button key={Login} onClick={()=>props.handleClick()} component={Link} to={"/login"}>
        <ListItemIcon>{<AccountCircleIcon />}</ListItemIcon>
        <ListItemText>LOGIN</ListItemText>
    </ListItem>

}


const RegisterListItem = (props) => {
    return <ListItem button key="register" onClick={()=>props.handleClick()} component={Link} to={"/register"}>
        <ListItemIcon>
            <AccountCircleIcon/>
        </ListItemIcon>
        <ListItemText primary="REGISTER USER"/>
    </ListItem>;
}

const AuditListItem = (props) => {
    return <ListItem button key={AuditEntries} onClick={()=>props.handleClick()} component={Link} to={"/audit"}>
        <ListItemIcon>{<TableChartIcon />}</ListItemIcon>
        <ListItemText>AUDIT ENTRIES</ListItemText>
    </ListItem>
}

const ProviderListItem = (props) => {
    return <ListItem button key={Provider} onClick={()=>props.handleClick()} component={Link} to={"/provider"}>
        <ListItemIcon>{<Store />}</ListItemIcon>
        <ListItemText>PROVIDERS</ListItemText>
    </ListItem>
}


const ProviderEntryListItem = (props) => {
    return <ListItem button key={ProviderEntries} onClick={()=>props.handleClick()} component={Link} to={"/providerEntry"}>
        <ListItemIcon>{<TableChartIcon />}</ListItemIcon>
        <ListItemText>PROVIDER ENTRIES</ListItemText>
    </ListItem>
}

const SuperAdminProviderEntryListItem = (props) => {
    return <ListItem button key={SuperAdminProviderEntries} onClick={()=>props.handleClick()} component={Link} to={"/superAdminProviderEntry"}>
        <ListItemIcon>{<TableChartIcon />}</ListItemIcon>
        <ListItemText>PROVIDER ENTRIES</ListItemText>
    </ListItem>
}

// NOT SURE WHERE THIS BUTTON IS AT!************************************************************************
const ProviderSignUpListItem = (props) => {
    return <ListItem button key="providerSignUp" onClick={()=>props.handleClick()} component={Link} to={"/providerSignUp"}>
        <ListItemIcon>
            {<AccountCircleIcon/>}
        </ListItemIcon>
        <ListItemText primary="CREATE PROVIDER"/>
    </ListItem>;
}


const EditProviderListItem = (props) => {
    return <ListItem button key={EditProvider} onClick={()=>props.handleClick()} component={Link} to={"/editProvider"}>
        <ListItemIcon>{<EditIcon />}</ListItemIcon>
        <ListItemText>MANAGE PROVIDER</ListItemText>
    </ListItem>
}


const SuperAdminEditUsersListItem = (props) => {
    return <ListItem button key={SuperAdminUsers} onClick={()=>props.handleClick()} component={Link} to={"/superAdminUsers"}>
        <ListItemIcon>{<EditIcon />}</ListItemIcon>
        <ListItemText>MANAGE ALL USERS</ListItemText>
    </ListItem>
}



const UserListItem = (props) => {
    return <ListItem button key={Profile} onClick={()=>props.handleClick()} component={Link} to={"/editUser"}>
        <ListItemIcon>{<AccountCircleIcon />}</ListItemIcon>
        <ListItemText>PROFILE</ListItemText>
    </ListItem>
}

const SuperAdminProvidersListItem = (props) => {
    return <ListItem button key={SuperAdminProviders} onClick={()=>props.handleClick()} component={Link} to={"/superAdminProviders"}>
        <ListItemIcon>{<EditIcon />}</ListItemIcon>
        <ListItemText>MANAGE PROVIDER</ListItemText>
    </ListItem>
}


// const SuperAdminSendPushListItem = (props) => {
//     return <ListItem button key={SuperAdminSendPushListItem} onClick={()=>props.handleClick()} component={Link} to={"/superAdminSendPush"}>
//         <ListItemIcon>{<SendIcon />}</ListItemIcon>
//         <ListItemText>SEND PUSH</ListItemText>
//     </ListItem>

    // return <ListItem key="superAdminSendPush" onClick={()=>props.handleClick()} component={Link} to={"/superAdminSendPush"}>
    //     {/*<ListItemIcon>*/}
    //     {/*    <AccountCircleIcon/>*/}

    //     {/*</ListItemIcon>*/}
    //     {/*<ListItemText primary="Manage Providers"/>*/}
    //     <Button startIcon={<SendIcon/>}>Send Push</Button>
    // </ListItem>;
// }

const LogOutListItem = (props) => {
    const handleClick = () =>{
        props.drawerProps.unsetToken(props.drawerProps.token);
        props.drawerProps.unsetUser(props.drawerProps.user);
        props.handleClick();
    }
    return <ListItem button key={Provider} onClick={()=>handleClick()} component={Link}>
        <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
        <ListItemText>LOGOUT</ListItemText>
    </ListItem>
}

const CareAppDrawer = (props) => {
    const classes = useStyles();
    const listOfListItems = [];

    const handleClick = () =>{
        props.setOpen(false);
    }


    //todo: check active status of user and providers
    listOfListItems.push(<HomeListItem handleClick={handleClick} />);
    listOfListItems.push(<ProviderListItem handleClick={handleClick}/>);


    //if user is there and is NOT an admin, add to the list
    if (props.token && props.user && !props.user.admin && props.user.superAdmin) {
        listOfListItems.push(<ProviderSignUpListItem handleClick={handleClick}/>);
        listOfListItems.push(<RegisterListItem handleClick={handleClick}/> );
    }

    //if user is there and is an admin, add to the list
    //user will only have provider if they are an admin
    if (props.token && props.user && props.user.admin) {
        listOfListItems.push(<EditProviderListItem handleClick={handleClick}/>);
        listOfListItems.push(<ProviderEntryListItem handleClick={handleClick}/>);
    }

    if (props.token && props.user && props.user.superAdmin) {
        listOfListItems.push(<AuditListItem handleClick={handleClick}/>);
        listOfListItems.push(<SuperAdminProvidersListItem handleClick={handleClick}/>);
        listOfListItems.push(<SuperAdminProviderEntryListItem handleClick={handleClick}/>);
        // listOfListItems.push(<SuperAdminSendPushListItem handleClick={handleClick}/>);
        listOfListItems.push(<SuperAdminEditUsersListItem handleClick={handleClick}/>);
    }

    if (props.token) {
        listOfListItems.push(<UserListItem handleClick={handleClick}/>);
        listOfListItems.push(<LogOutListItem handleClick={handleClick} drawerProps={props}/>);
    } else {
        listOfListItems.push(<LoginListItem handleClick={handleClick}/>);
    }





    return (
        <div>
            <div className={classes.toolbar}/>
            <List>
                {
                    listOfListItems.map((data, index) => (
                        data
                    ))
                }
            </List>
        </div>
    )
}

// Then, because we want to compose our web pages with composable elements we have to export the code in the file. Always write this line at then end of your .js files:
export default CareAppDrawer
