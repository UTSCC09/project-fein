'use client'

import React, { useState, useEffect } from 'react';
import { mockHistoricalData } from '../../MockData/MockStocks';
import { convertUnixTimestamptoDate, convertDateToUnixTimestamp, createDate } from './Helpers/dateHelper';
import Card from './Card';
import { chartConfig } from '../../MockData/config';
import { useThemeContext } from '../../Context/ThemeContext';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import ChartFilter from './ChartFilter';

import { companyCandle } from '../../../api/api.mjs';
import { useStockContext } from '../../Context/StockContext';


function Chart(props) {
    const { setMessage, stockSymbol } = props;
    const { darkMode } = useThemeContext();
    //const { stockSymbol } = useStockContext();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("1W");


    const formatData = (data) => {
        if (!data.values) return;
        return data.values.reverse().map((item, index) => {
            //console.log(item);
            return {
                value: parseFloat(item.heikincloses).toFixed(2),
                date: item.datetime,
            };
        });
    }

    useEffect(() => {
        function getDateRange() {
            const { days, weeks, months, years } = chartConfig[filter];
            const endDate = new Date();
            const startDate = createDate(endDate, -days, -weeks, -months, -years);
            const startTimestampUnix = convertDateToUnixTimestamp(startDate);
            const endTimestampUnix = convertDateToUnixTimestamp(endDate);

            return { startTimestampUnix, endTimestampUnix };
        };

        async function updateChart() {
            const { startTimestampUnix, endTimestampUnix } = getDateRange();
            const resolution = chartConfig[filter].resolution;
            const result = await companyCandle(stockSymbol, resolution);
            console.log(result);
            if (result.status == "ok") {
                setData(formatData(result));
                setMessage({ err: false })
            } else {

                setData([]);
                setMessage({ err: true, message: result.message })
                console.log("made it")
            }
        }
        updateChart();
    }, [stockSymbol, filter]);

    return (
        <Card>
            {data.length != 0 ? (
                <>
                    <ul className="flex absolute top-2 right-8 z-40">
                        {Object.keys(chartConfig).map((key) => (
                            <li key={key}>
                                <ChartFilter text={key} active={filter === key} onClick={() => {
                                    setFilter(key);
                                }} />
                            </li>
                        ))}
                    </ul>
                    <ResponsiveContainer>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={darkMode ? "#00ba00" : "#00a300"} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#029c02" stopOpacity={0} />
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
                            <XAxis dataKey={"date"} />
                            <YAxis domain={["dataMin", "dataMax"]} />
                        </AreaChart>
                    </ResponsiveContainer>
                </>

            ) : (<></>)}
        </Card>
    )
}

export default Chart;