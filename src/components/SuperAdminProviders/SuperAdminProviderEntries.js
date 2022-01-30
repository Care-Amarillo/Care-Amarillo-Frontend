import React, {Component} from 'react';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import format from "date-fns/format";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import 'date-fns';
import axios from "axios";
import MaterialTable from "material-table";
import {forwardRef} from 'react';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';


import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import AlertDialogSlide from "../AlertDialogSlide";
import {ToastContainer, ToastMessage, ToastMessageAnimated} from "react-toastr";
import "./SuperAdminProviderEntries.css";
import ProviderEntriesChart from "./ProviderEntriesChart";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};


const CLIENT_ID = '461686716459-krre353uecr54mdkbbj094vf9mevti55.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCOvmLGpbzVEgMywSh3g4g6mbaynTbdIiU';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";


const ProviderTable = (props) => {
    return <div style={{maxWidth: "100%"}}>
        <MaterialTable
            icons={tableIcons}
            columns={[
                {
                    title: 'Provider',
                    field: 'name',
                    render: rowData => rowData.provider['name'],
                    headerStyle: {
                        width: 20,
                        maxWidth: 20,
                    }, cellStyle: {
                        width: 20,
                        maxWidth: 20,
                        fontSize: 14
                    },
                    customFilterAndSearch: (term, rowData) => (rowData.provider['name']).indexOf(term) != -1
                },
                {
                    title: "Amount Changed", field: "amountChanged", headerStyle: {
                        width: 20,
                        maxWidth: 20,
                    }, cellStyle: {
                        width: 20,
                        maxWidth: 20,
                        fontSize: 14
                    },
                },
                {
                    title: "Date", field: "createdAt", type: "datetime", searchable: false, headerStyle: {
                        width: 20,
                        maxWidth: 20,
                    }, cellStyle: {
                        width: 20,
                        maxWidth: 20,
                        fontSize: 14
                    },
                },

            ]}
            data={props.data}
            title="Provider Entry"
            options={{
                sorting: true,
                search: true,
                exportButton: true,
                exportCsv: (columns, data) => {

                    props.setOpen();
                }
            }}
        />
    </div>;
}


class SuperAdminProviderEntries extends Component {
    constructor(props) {
        super(props);
        let midNight = new Date();
        midNight.setHours(24, 0, 0, 0);

        let todayMidNight = new Date();
        todayMidNight.setHours(0, 0, 0, 0);

        this.state = {
            providerId: "",
            name: "",
            entries: [],
            graphEntries: [],
            selectedStartDate: todayMidNight,
            selectedEndDate: midNight,
            open: false,
            sheetsDialogOpen: false,
            alertTitle: "CSV Export Options",
            alertDescription: "How would you like your CSV to be exported?",
            alertYesOptionTitle: "CSV",
            alertNoOptionTitle: "Google Sheets",
            alertSheetsTitle: "Google Sheets Export Options",
            alertSheetsDescription: "Copy the new link to your clipboard or open the Google Sheet in a new tab?",
            alertSheetsYesOptionTitle: "Copy",
            alertSheetsNoOptionTitle: "Open In New Tab",
            sheetUrl: ""
        }
    }


    componentDidMount() {

        this.props.setIsHomePage(false);
        this.loadData();
    }


    loadData = async () => {


        let URL = `${process.env.REACT_APP_BACKEND_ENDPOINT}/providerEntries?startDate=` + this.state.selectedStartDate.toISOString() + "&endDate=" + this.state.selectedEndDate.toISOString();

        this.setState({
            entries: []
        });


        const config = {
            "Authorization": `Bearer ${this.props.token}`
        };

        const response = await axios({
            method: 'get',
            url: URL,
            headers: config
        });


        const data = await response.data;

        this.setState({
            entries: data
        });


        this.getGraphData(data);

    }

    getGraphData = (data) => {
        let tempDays = [];
        let currentCount = 0;
        let currentIndex = 0;
        let prevDate = null;
        data.forEach((element) => {
            // console.log(element)
            let amountChanged = element["amountChanged"];
            if (amountChanged > 0) {
                let createdAt = new Date(element["createdAt"]);
                let createdAtData = element["createdAt"];
                let day = createdAt.getDay();
                let month = createdAt.getMonth();
                let year = createdAt.getFullYear();
                if (tempDays.length === 0) {
                    currentCount += amountChanged;
                    let dateData = {
                        createdAt: createdAtData,
                        amountChanged: currentCount
                    }
                    tempDays[currentIndex] = dateData;
                    prevDate = createdAt;
                } else {
                    let prevDateDay = prevDate.getDay();
                    let prevDateMonth = prevDate.getMonth();
                    if (prevDateDay === day && prevDateMonth === month) {
                        // console.log("found same day");
                        currentCount += amountChanged;
                        let dateData = {
                            createdAt: createdAtData,
                            amountChanged: currentCount
                        }
                        tempDays[currentIndex] = dateData;
                    } else {
                        // console.log("different day");
                        currentCount = 0 + amountChanged;
                        currentIndex++;
                        let dateData = {
                            createdAt: createdAtData,
                            amountChanged: currentCount
                        }
                        tempDays[currentIndex] = dateData;
                    }
                    prevDate = createdAt;
                }
            }


        });

        // console.log(`tempDays length is ${tempDays.length}`);
        tempDays.forEach((element) => {
            // console.log(`tempDays element is ${JSON.stringify(element)}`);
        });


        this.setState({
            graphEntries: tempDays
        });

    }


    handleStartDateChange = (e) => {
        // setSelectedStartDate(e);
        if (Object.prototype.toString.call(e) === "[object Date]") {
            // it is a date
            if (isNaN(e.getTime())) {  // d.valueOf() could also work
                // date is not valid
                return;
            }
            // date is valid
        } else {
            // not a date
            return;
        }
        this.setState({
                selectedStartDate: e,

            },
            () => {
                this.loadData();
            });
    };

    handleEndDateChange = (e) => {
        // setSelectedEndDate(e);
        if (Object.prototype.toString.call(e) === "[object Date]") {
            // it is a date
            if (isNaN(e.getTime())) {  // d.valueOf() could also work
                // date is not valid
                return;
            }
            // date is valid
        } else {
            // not a date
            return;
        }
        this.setState({
                selectedEndDate: e
            },
            () => {
                this.loadData();
            });
        this.loadData();
    };


    exportReportToGoogleSheets = () => {
        this.handleClientLoad();

    }


    handleClientLoad = () => {
        window.gapi.load('client:auth2', this.initClient);
    }


    updateSignInStatus = (isSignedIn) => {
        if (isSignedIn) {
            this.makeGoogleSheetsApiCall();
            // saveDataToSheet();
        }
    }

    initClient = async () => {
        await window.gapi.client.init({
            apiKey: process.env.REACT_APP_SHEETS_GOOGLE_API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
        });

        await window.gapi.auth2.init({
            client_id: process.env.REACT_APP_SHEETS_CLIENT_ID,
            scope: SCOPES
        });

        window.gapi.auth2.getAuthInstance().signIn();

        window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSignInStatus);

        // Handle the initial sign-in state.
        this.updateSignInStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    }


    makeGoogleSheetsApiCall = async () => {

        let response = await window.gapi.client.sheets.spreadsheets.create({
            properties: {
                title: "Provider Entries"
            }
        });

        let result = response.result;
        let sheets = response.result.sheets;
        let sheetOne = sheets[0];
        let sheetId = result.spreadsheetId;
        let sheetUrl = result.spreadsheetUrl;

        this.setState({
            sheetUrl: sheetUrl
        }, () => {
            this.setSheetsDialogOpen();
        });

        this.saveDataToGoogleSheet(sheetId);


    }

    saveDataToGoogleSheet = (sheetId) => {

        let len = this.state.entries.length;
        let arr = new Array(len);
        arr[0] = new Array(3);
        arr[0][0] = "Change Amount";
        arr[0][1] = "Date";

        for (let i = 1; i < len + 1; i++) {
            arr[i] = new Array(3);
            for (let j = 0; j < 2; j++) {


                if (j == 0) {
                    arr[i][j] = this.state.entries[i - 1]["amountChanged"];
                } else if (j == 1) {
                    let formattedDate = format(new Date(this.state.entries[i - 1]["createdAt"]), "MMMM d, yyyy H:mma").toString();
                    arr[i][j] = formattedDate;
                }

            }
        }


        let data = [];
        data.push({
            range: 'Sheet1',
            values: arr
        });
        // Additional ranges to update.

        var body = {
            data: data,
            valueInputOption: 'RAW'
        };

        var spreadsheetId = sheetId;


        window.gapi.client.sheets.spreadsheets.values.batchUpdate({
            spreadsheetId: spreadsheetId,
            resource: body
        }).then((response) => {
            var result = response.result;
        });
    }

    //todo: add date to filename
    exportReport = () => {
        let arr = [];
        let len = this.state.entries.length;
        for (let i = 0; i < len; i++) {
            let formattedDate = format(new Date(this.state.entries[i].createdAt), "MMMM d, yyyy H:mma").toString();
            arr.push({
                "Amount Changed": this.state.entries[i].amountChanged,
                "Date": formattedDate
            });
        }

        this.downloadCSV({
            filename: "provider-entry-report-data.csv"
        }, arr);
    }


    //todo: put in separate files so multiple components can call it
    downloadCSV = (args, report) => {
        let data, filename, link;
        let csv = this.convertArrayOfObjectsToCSV({
            data: report
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

    //todo: put in separate files so multiple components can call it
    convertArrayOfObjectsToCSV = (args) => {
        let result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function (item) {
            ctr = 0;
            keys.forEach(function (key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    setOpen = () => {
        let openStatus = this.state.open;
        if (openStatus) {
            openStatus = false;
        } else {
            openStatus = true;
        }

        this.setState({
            open: openStatus
        });
    }

    setSheetsDialogOpen = () => {
        let openStatus = this.state.sheetsDialogOpen;
        if (openStatus) {
            openStatus = false;
        } else {
            openStatus = true;
        }

        this.setState({
            sheetsDialogOpen: openStatus
        });
    }

    slideAlertCallback = (isCSV) => {
        if (isCSV) {
            this.exportReport();
        } else {
            this.exportReportToGoogleSheets();
        }
    }


    sheetsSlideAlertCallback = (isCopy) => {
        if (isCopy) {
            navigator.clipboard.writeText(this.state.sheetUrl);

            this.container.success(`Link Copied To Clipboard`, `Success`, {
                closeButton: true,
            });
        } else {
            window.open(this.state.sheetUrl, '_blank');
        }
    }


    render() {
        return (
            <div className="providerEntryContainer">
                <ToastContainer
                    ref={ref => this.container = ref}
                    className="toast-bottom-right"
                />
                {/*dialog used to open csv option*/}
                <AlertDialogSlide open={this.state.open} setOpen={this.setOpen}
                                  alertSlideCallback={this.slideAlertCallback} title={this.state.alertTitle}
                                  description={this.state.alertDescription}
                                  yesOptionTitle={this.state.alertYesOptionTitle}
                                  noOptionTitle={this.state.alertNoOptionTitle}/>


                {/*dialog for copy or open in new tab of google sheets link */}
                <AlertDialogSlide open={this.state.sheetsDialogOpen} setOpen={this.setSheetsDialogOpen}
                                  alertSlideCallback={this.sheetsSlideAlertCallback}
                                  title={this.state.alertSheetsTitle}
                                  description={this.state.alertSheetsDescriptionDescription}
                                  yesOptionTitle={this.state.alertSheetsYesOptionTitle}
                                  noOptionTitle={this.state.alertSheetsNoOptionTitle}/>

                <Container id="datesContainer">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div id="dateContainer">
                            <KeyboardDatePicker
                                disableToolbar
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-start"
                                label="Start Date"
                                value={this.state.selectedStartDate}
                                onChange={this.handleStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-end"
                                label="End Date"
                                value={this.state.selectedEndDate}
                                onChange={this.handleEndDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                    </MuiPickersUtilsProvider>
                </Container>

                <div id="chartContainer">
                    <ProviderEntriesChart entries={this.state.graphEntries}/>
                </div>
                <div id="tableContainer">
                    <ProviderTable data={this.state.entries} setOpen={this.setOpen}/>
                </div>


            </div>
        );
    }
}

export default SuperAdminProviderEntries;
