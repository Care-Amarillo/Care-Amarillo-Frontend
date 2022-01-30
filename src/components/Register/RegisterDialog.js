import React, {useEffect, useState} from "react";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import './Register.css';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import ProviderDialogItem from "./ProviderDialogItem";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);



const RegisterDialog = (props) => {
    const [providers, setProviders] = useState([]);
    const [query, setSearchQuery] = useState("");


    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };


    const loadData = async () => {
        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/providersActive`;

        const response = await axios({
            method: 'get',
            url: URL,
            params:{
                searchQuery:query,
            }

        });

        const data = await response.data;
        setProviders(data);

    }


    const providerSelected = (provider) => {
        props.providerDialogCallback(provider);
        handleClose();
    }

    const searchChanged = (e) => {
        setSearchQuery(e.target.value);
    }

    useEffect(() => {
        loadData();
    }, [query]);


    return (
        <div >
            <Dialog id="dialogContainer" onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Choose Provider
                </DialogTitle>
                <DialogContent dividers>
                     <TextField style ={{width: '100%'}}  label="Search for Shelter..." onChange={searchChanged} type="search" variant="outlined"/>
                    {providers.map((data, index) => (
                        <ProviderDialogItem key={index} index={index} data={data} providerCallback={providerSelected}/>
                    ))}
                </DialogContent>
                {/*<DialogActions>*/}
                {/*    <Button autoFocus onClick={handleClose} color="primary">*/}
                {/*        Save changes*/}
                {/*    </Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
}

export default RegisterDialog;
