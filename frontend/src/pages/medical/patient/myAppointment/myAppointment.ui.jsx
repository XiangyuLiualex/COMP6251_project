import { Table, TableContainer } from "@mui/material";
import { sessionStore } from "../../../../entities/session";
  import * as React from "react";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
import { useMyAppointmentQuery } from "../../../../entities/patient/appointment.query";


export function MyAppointmentTable({ applications, status }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>GP Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Reason</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.filter(application => 
            status === "done" ? application.status === "done" : application.status !== "done"
          ).map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.gpName}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.reason}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export function MyAppointmentPage() {
    const { data, isLoading, error, refetch } =useMyAppointmentQuery(sessionStore.getState().uid);
    if (error) return <h4>Error: {error.message}, retry again</h4>;
    if (isLoading) return <h4>...Loading data</h4>;
    console.log("myAppointment",data)
  
    const applications = data.sort((a, b) => {
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
            <h2>Incoming Application</h2>
            <MyAppointmentTable 
                        applications={applications}
                        status={"undo"}
            />
            <h2>Done Application</h2>
            <MyAppointmentTable 
                        applications={applications}
                        status={"done"}
            />
        </div>
    )
}

