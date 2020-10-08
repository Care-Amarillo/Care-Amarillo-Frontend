import React, {Component} from 'react';
import './ProviderDialogItem.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    Link
} from "react-router-dom";



const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"column",
        // justifyContent:"center",
        margin:"10px",
        width: "90%",
        // backgroundColor: "#132C3C",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 17,
        textAlign:"center",
        fontWeight: "bold",
        // color:"white"
    },
    secondText: {
        textAlign:"center",
        // color:"white"

    },
    sound: {
        width:"100%"
    },
    pos: {
        marginBottom: 12,
    },
    button:{
        backgroundColor:"#132C3C",
        color:"white",
        '&:hover': {
            backgroundColor: "lightgrey",
            color: '#000000'
        }
    }
});


const ProviderCard = (props) => {
    const classes = useStyles();

    const data = props.data;
    const bedCount = data.totalBeds - data.bedsUsed;
    const name = data.name;

    const providerChosen=()=>{
       props.callback(data);
    }
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} >
                    {name}
                </Typography>
                {/*<Typography className={classes.secondText} >*/}
                {/*    Avaliable Beds: {bedCount}*/}
                {/*</Typography>*/}
            </CardContent>
            <CardActions>
                <Button  className={classes.button}  onClick={providerChosen} >
                   Select
                </Button>
            </CardActions>
        </Card>
    )
}

class ProviderDialogItem extends Component {

   providerSelected = (provider)=>{
       this.props.providerCallback(provider);
   }

    render() {
        return (
            <div id="providerContainer">
                <ProviderCard data={this.props.data} callback={this.providerSelected}/>
            </div>
        );
    }
}


export default ProviderDialogItem;