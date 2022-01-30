import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Paper} from "@material-ui/core";
import React from "react";
import format from "date-fns/format";
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent";

export default function ProviderEntriesChart(props) {


    const formatXAxis = tickItem => {
        // console.log(tickItem);
        if (tickItem != null) {
            return format(new Date(tickItem), "MM/d/yyyy").toString();
        } else {
            return format(new Date(), "MM/d/yyyy").toString();
        }
    }

    const CustomTooltip = props => {
        // we don't need to check payload[0] as there's a better prop for this purpose
        if (!props.active || !props.payload) {
            // I think returning null works based on this: http://recharts.org/en-US/examples/CustomContentOfTooltip
            return null
        }
        // mutating props directly is against react's conventions
        // so we create a new payload with the name and value fields set to what we want
        // console.log(`payload is ${JSON.stringify(props.payload[0].payload)}`)
        const newPayload = [
            {
                name: 'Amount Changed',
                // all your data which created the tooltip is located in the .payload property
                value: props.payload[0].payload.amountChanged,
                // you can also add "unit" here if you need it
            },
            //   ...props.payload,
        ];

        // we render the default, but with our overridden payload
        return <DefaultTooltipContent {...props} payload={newPayload}/>;
    }


    return(
        <Paper>
            <ResponsiveContainer width={"100%"} height={300}>
                <LineChart width={"100%"} height={300} data={props.entries}>
                    <Line type="monotone" dataKey="amountChanged" stroke="#8884d8"/>
                    <XAxis interval={0} dataKey="createdAt" tickFormatter={formatXAxis}/>
                    <YAxis dataKey="amountChanged"/>
                    <Tooltip labelFormatter={formatXAxis} content={<CustomTooltip/>}/>
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );

}
