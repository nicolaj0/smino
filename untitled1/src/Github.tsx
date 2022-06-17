import React, {useEffect, useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import {format} from 'date-fns'
import * as _ from "lodash";
import Box from '@mui/material/Box';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {Card} from "@mui/material";

const columns: GridColDef[] = [
    {field: 'date', headerName: 'date'},
    {field: 'count', headerName: 'count'},


];
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

export function Todos() {

    let graphData: any;
    const [page, setPage] = useState(1);
    const [allData, setAllData] = useState([]);
    const {data} = useGitgub({page});
    let gps: any[] = [];
    useEffect(() => {
        // @ts-ignore
        if (data && _.last(data)?.commit.author.date > '2022-01-01') {
            setPage(page + 1);
            // @ts-ignore
            setAllData([...allData, ...data]);
        }

    }, [data]);
    gps = allData && _.chain(allData)
        .groupBy((c: any) => format(new Date(c.commit.author.date), 'MM/dd/yyyy'))
        .map((value, key) => ({date: key, count: value.length}))
        .value()
    graphData = {
        labels: gps?.map(e => e.date),
        datasets: [
            {
                label: 'Dataset 1',
                data: gps?.map(f => f.count),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div className="m-4 grid  grid-cols-1 xl:grid-cols-3 gap-4">
            <Box sx={{ width: '100%', height: 500}}>
                <DataGrid
                    rows={gps}
                    getRowId={(r) => r.date}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </Box>

            <div className="xl:col-span-2">
                <Box  sx={{  width: '100%'}}>
                    {graphData && <Bar options={options} data={graphData}/>}
                </Box>
            </div>

        </div>


    )
}


export async function get(url: string): Promise<any> {
    const instance = axios.create({
        baseURL: url,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "token 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"
        },
    });
    return instance.get(url).then((res) => res.data);
}


function useGitgub({page}: { page: number }) {
    return useQuery(['motifs', page],
        () => get(`https://api.github.com/repos/nicolaj0/Qinto/commits?page=${page}&per_page=50`).then((data) => data));


}

