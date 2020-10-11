import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import {ToastContainer} from "react-toastr";

export default function ForgotPasswordDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.toggleClicked();
    };

    const resetPasswordRequest = async () => {
        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/forgotPassword`;

        const response = await axios({
            method: 'post',
            url: URL,
            data:{
                email:email,
            }

        });

        const data = await response.data;
        console.log(`data: ${JSON.stringify(data)}`);

        props.resetDone();


    }

    const onChangeEmail = (e) => {
        console.log(`onChange email is ${e.target.value}`)
        setEmail(e.target.value);
    }


    return (
        <div>

            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To get a password reset link, please enter your email.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={onChangeEmail}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={resetPasswordRequest} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
