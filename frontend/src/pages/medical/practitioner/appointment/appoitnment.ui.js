import {
  useHandleAppointmentQuery,
  useUpdateAppointmentMutation,
} from "../../../../entities/practitioner/handleAppointment.query";
import { sessionStore } from "../../../../entities/session";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export function BasicTable({ appointments, onUpdateAppointment, onRefetch }) {
  const handleOnUpdate = async (
    appointmentId,
    gpId,
    slotId,
    gpName,
    time,
    date,
    status
  ) => {
    await onUpdateAppointment(
      appointmentId,
      gpId,
      slotId,
      gpName,
      time,
      date,
      status
    );
    onRefetch();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>PatientId</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Reason</TableCell>
            <TableCell align="right">status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.patientId}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.reason}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                <button
                  onClick={() =>
                    handleOnUpdate(
                      row.id,
                      row.gpId,
                      row.slotId,
                      row.gpName,
                      row.time,
                      row.date,
                      "Approved"
                    )
                  }
                >
                  Accept
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function HandleAppointmentPage() {
  const { data, isLoading, error, refetch } = useHandleAppointmentQuery(
    sessionStore.getState().uid
  );
  const {
    mutate: mutateAppointment,
    isLoad,
    isError,
    isSuccess,
  } = useUpdateAppointmentMutation();

  if (error) return <h4>Error:{error.message}, retry again</h4>;
  if (isLoading) return <h4>...Loading data</h4>;
  console.log(data);
  const appointments = data;

  if (isSuccess) {
    // isSuccess 变为 true 时执行的函数
    refetch();
    // 可在这里调用需要执行的函数
  }
  const handleUpdateAppointment = (
    appointmentId,
    gpId,
    slotId,
    gpName,
    time,
    date,
    status
  ) => {
    mutateAppointment({
      appointmentId: appointmentId,
      gpId: gpId,
      slotId: slotId,
      gpName: gpName,
      time: time,
      date: date,
      status: status,
    });
  };

  return (
    <div>
      <h1>Appointment</h1>
      <BasicTable
        appointments={appointments}
        onUpdateAppointment={handleUpdateAppointment}
        onRefetch={refetch}
      />
    </div>
  );
}
