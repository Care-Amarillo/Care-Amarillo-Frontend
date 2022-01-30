import React from 'react';
import {useTheme, makeStyles} from '@material-ui/core/styles';
import {LineChart, Line, XAxis, YAxis, Label, Tooltip, ResponsiveContainer} from 'recharts';
import Paper from '@material-ui/core/Paper';

// Generate Sales Data
function createData(time, amount) {
    return {time, amount};
}

const data = [
    createData('10/01/2020', 0),
    createData('', 3),
    createData('', 6),
    createData('', 8),
    createData('', 1),
    createData('', 2),
    createData('', 2),
    createData('', 2),
    createData('10/30/20', 5),
];

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 20,
        height: 300,
        width: "100%",
        paddingBottom: 100,
        paddingRight: 20,
    },
    lable: {
        marginTop: '10%'
    }
}))

export default function Chart() {
    const theme = useTheme();
    const classes = useStyles();
    return (
        <Paper className={classes.container}>
            <React.Fragment>
                <h2>October 5, 2020</h2>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        // margin={{
                        //   top: 16,
                        //   right: 16,
                        //   bottom: 0,
                        //   left: 24,
                        // }}
                    >
                        <XAxis dataKey="time" stroke={theme.palette.text.secondary}>
                            <Label
                                angle={0}
                                position="middle"
                                style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                            >
                                Date
                            </Label>
                        </XAxis>
                        <YAxis stroke={theme.palette.text.secondary}>
                            <Label
                                angle={270}
                                position="left"
                                style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                            >
                                Beds
                            </Label>
                        </YAxis>
                        <Tooltip/>
                        <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false}
                              fill="#132C3C"/>
                    </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        </Paper>
    );
}
