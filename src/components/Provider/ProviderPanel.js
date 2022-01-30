import React, {Component} from 'react';
import Providers from "../Providers/Providers";
import axios from "axios";
import Button from '@material-ui/core/Button';
import './ProviderPanel.css';
import {Link} from "react-router-dom";
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#132C3C",
        },
        secondary: {
            main: "#132C3C",
        },
    },
});


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


class ProviderPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            providers: [],
            searchQuery: ""
        }
    }


    componentDidMount() {
        this.props.setIsHomePage(false);
        this.loadData();

    }

    searchChanged = (e) => {
        this.setState({
            searchQuery: e.target.value
        }, () => {
            this.loadData();
        })

    }

    loadData = async () => {


        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/providersActive`;


        const response = await axios({
            method: 'get',
            url: URL,
            params: {
                searchQuery: this.state.searchQuery
            }

        });


        const data = await response.data;

        this.setState({
            providers: data
        });

    }


    render() {
        let providerButton = <Button variant="contained" id="providerButton" to="/providerSignup" component={Link}>
            Add New Provider
        </Button>;
        if (this.props.user && (this.props.user.admin || this.props.user.superAdmin)) {
            providerButton = <div id="noneElement"></div>;
        }


        return (
            <div class="providerPanelContainer">
                {/*<div id="chartContainer">*/}
                {/*    /!*<Chart/>*!/*/}
                {/*</div>*/}
                <br/>
                <div id="title">
                    <h2>Providers</h2>
                </div>


                <div id="cardContent">
                    {this.state.providers.map((data, index) => (
                        <Providers key={index} index={index} data={data}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default ProviderPanel;
