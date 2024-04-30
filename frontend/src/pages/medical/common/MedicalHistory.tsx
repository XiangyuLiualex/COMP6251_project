import { useHistoryQuery } from "../../../entities/patient/history.query.jsx"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function MedicalHistoryPage(config) {
    // const data = [{ "id": 12, "name": "asb" }, { "id": 13, "name": "asb" }]
    const id = config.id;

    const { data } = useHistoryQuery(id)
    console.log(data)
    // TODO refactor based on https://mui.com/material-ui/react-list/
    function createData({ userId, disease, description, createdAt }) {
        return { userId, disease, description, createdAt };
    }

    const rows = data?.map((item) => createData({
        userId: item.userId,
        disease: item.disease,
        description: item.description,
        createdAt: item.createdAt,
    })) || [];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">UserID</TableCell>
                        <TableCell align="right">Disease</TableCell>
                        <TableCell align="right">Threapy</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row)=> (
                        <TableRow
                            key={row.userId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {rows.userId}
                            </TableCell>
                            <TableCell align="right">{row.userId}</TableCell>
                            <TableCell align="right">{row.disease}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
    /*return (
        <div>
            <h1>Medical History</h1>
            {data?.map((item) => {
                return (
                    <div key={item.id}>
                        <p>{item.userId}</p>
                        <p>{item.disease}</p>
                        <p>{item.description}</p>
                        <p>{item.createdAt}</p>
                    </div>
                )
            })}
        </div>
    )*/
}




