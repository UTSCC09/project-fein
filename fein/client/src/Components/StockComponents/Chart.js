import React, {useState} from 'react';
import { mockHistoricalData } from '../../MockData/MockStocks';
import { convertUnixTimestamptoDate } from './Helpers/dateHelper';
import Card from './Card';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const Chart = () => {
    const [data, setData] = useState(mockHistoricalData);
    const [filter, setFilter] = useState("1W");

    const formatData = () => {
        if(!data.c) return;
        return data.c.map((item, index) => {
            return {
                value: item.toFixed(2),
                date: convertUnixTimestamptoDate(data.t[index]),
            };
        });
    }
    
    return(
        <Card>
            <ResponsiveContainer>
                <AreaChart data={formatData(data)}>
                    <defs>
                        <linearGradient id="chartColor" x1="0" y1= "0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2e2e2e" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#2e2e2e" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#2e2e2e"
                        fillOpacity={1}
                        strokeWidth={0.5}
                        fill="url(#chartColor)"
                    />
                    <Tooltip />
                    <XAxis dataKey={"date"}/>
                    <YAxis domain={["dataMin", "dataMax"]}/>
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default Chart;