import React, {useState, useContext } from 'react';
import { mockHistoricalData } from '../../MockData/MockStocks';
import { convertUnixTimestamptoDate } from './Helpers/dateHelper';
import Card from './Card';
import { chartConfig } from '../../MockData/config';
import ThemeContext from '../../Context/ThemeContext';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import ChartFilter from './ChartFilter';


const Chart = () => {
    const { darkMode } = useContext(ThemeContext);
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
            <ul className="flex absolute top-2 right-2 z-40">
                {Object.keys(chartConfig).map((key) => (
                    <li key={key}>
                        <ChartFilter text={key} active={filter === key} onClick={() =>  {
                            setFilter(key);
                        }} />
                    </li>
                ))}
            </ul>

            <ResponsiveContainer>
                <AreaChart data={formatData(data)}>
                    <defs>
                        <linearGradient id="chartColor" x1="0" y1= "0" x2="0" y2="1">
                            <stop offset="5%" stopColor={darkMode ? "#00ba00" : "#00a300"} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#029c02" stopOpacity={0}/>
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