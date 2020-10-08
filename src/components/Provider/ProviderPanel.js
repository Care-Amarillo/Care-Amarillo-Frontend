import React, {Component} from 'react';
import Providers from "../Providers/Providers";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import './ProviderPanel.css';
import {Link} from "react-router-dom";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";
import CareAppNav from '../CareAppBar/CareAppNav';
import Chart from './Chart';
import {Box, Card, CardContent, isWidthDown, isWidthUp} from '@material-ui/core';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

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

    getGridListCols = () => {
        if (isWidthUp('xl', this.props.width)) {
            return 4;
        }

        if (isWidthDown('lg', this.props.width)) {
            return 3;
        }

        if (isWidthDown('md', this.props.width)) {
            return 2;
        }


        return 1;
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
                <div id="chartContainer">
                    {/*<Chart/>*/}
                </div>
                <br/>
                <div id="title">
                    <h2>Provider</h2>
                </div>


                {/*<div id="cardContainer">*/}
                <div id="cardContent">

                    {this.state.providers.map((data, index) => (
                        <Providers key={index} index={index} data={data}/>
                    ))}

                    {/*<GridList style={{width: '100%'}} cols={this.getGridListCols}>*/}
                    {/*        {this.state.providers.map((data, index) => (*/}
                    {/*            <GridListTile   key={index}>*/}
                    {/*                <Providers key={index} index={index} data={data}/>*/}
                    {/*            </GridListTile>*/}
                    {/*        ))}*/}
                    {/*    </GridList>*/}
                </div>
                {/*</div>*/}
            </div>
        );
    }
}

export default ProviderPanel;