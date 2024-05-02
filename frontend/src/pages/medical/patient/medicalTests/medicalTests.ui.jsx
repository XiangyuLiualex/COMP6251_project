import { useEffect, useState } from "react";
import { useTestQuery, useUpdateTestMutation, useDoneTestMutation, useGetTestQuery } from "../../../../entities/practitioner/test.query";
import { Table, TableContainer } from "@mui/material";
import { sessionStore } from "../../../../entities/session";
import {
  useHandleAppointmentQuery,
  useUpdateAppointmentMutation,
} from "../../../../entities/practitioner/handleAppointment.query";
import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function PatientTestTable({ tests, status }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Test Name</TableCell>
            <TableCell align="right">Test Description</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Status</TableCell>
            {status === "done" && <TableCell align="right">Result</TableCell>} {/* Conditionally add Result column header */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.filter(test => test.status === status).map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.status.toUpperCase()}</TableCell>
              {row.status === "done" && <TableCell align="right">{row.result}</TableCell>} {/* Conditionally render Result column */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function MedicalTestsPage() {
  const userId = sessionStore.getState().uid
  const { data, isLoading, error, refetch } = useGetTestQuery(userId);
  if (error) return <h4>Error: {error.message}, retry again</h4>;
  if (isLoading) return <h4>...Loading data</h4>;

  const tests = data?.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else if (a.date > b.date) {
      return 1;
    }
    let timeA = a.time.split('-')[0]; // 获取开始时间 "8:00"
    let timeB = b.time.split('-')[0]; // 获取开始时间 "9:00"
    let minutesA = parseInt(timeA.split(':')[0]) * 60 + parseInt(timeA.split(':')[1]);
    let minutesB = parseInt(timeB.split(':')[0]) * 60 + parseInt(timeB.split(':')[1]);
    return minutesA - minutesB;
  });

  return (
    <div>
      <h1>Medical Tests</h1>
      <h2>Incoming tests</h2>
      <PatientTestTable
        tests={tests}
        status={"undo"}
      />
      <h2>Done tests</h2>
      <PatientTestTable
        tests={tests}
        status={"done"}
      />
    </div>
  )
}