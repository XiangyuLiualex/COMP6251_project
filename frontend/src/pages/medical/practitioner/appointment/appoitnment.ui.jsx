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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import useUpdateSlotMutation from "../../../../entities/patient/appointment.query";
import { ViewProfile } from "../../general/generalProfile.ui";

function AlternativeComponent({ appointment, onUpdateAppointment }) {
  const [open, setOpenAlt] = React.useState(false);
  const handleClickOpen = () => {
    setOpenAlt(true);
  };
  const handleClose = () => {
    setOpenAlt(false);
  };
  // console.log(appointment.id);
  // gpId,slotId,gpName,time,date,status
  const handleonUpdate = (formJson, appointment) => {
    // console.log(appointment);
    const updateData = {};
    updateData.id = appointment.id;
    if (formJson.gpId !== '') updateData.gpId = formJson.gpId;
    if (formJson.slotId !== '') updateData.slotId = formJson.slotId;
    if (formJson.gpName !== '') updateData.gpName = formJson.gpName;
    if (formJson.time !== '') updateData.time = formJson.time;
    const dataToSend = { ...appointment, ...updateData };
    onUpdateAppointment(dataToSend.id, dataToSend.gpId, dataToSend.slotId, dataToSend.gpName, dataToSend.time, dataToSend.date, "beforeApprove");
  }
  return (
    <React.Fragment>
      <Button variant="outlined"
        disabled={appointment.status === "done"}
        color={appointment.status === "done" ? "secondary" : "primary"} onClick={handleClickOpen}>
        Alternative
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            handleonUpdate(formJson, appointment);
            handleClose();
          },
        }}
      // gpId,slotId,gpName,time,date,status
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the field you want to changed. Please leave the unChange field empty!!
          </DialogContentText>
          <TextField
            margin="dense"
            id="gpId"
            name="gpId"
            label="GP Id"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="slotId"
            name="slotId"
            label="Slot Id"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="gpName"
            name="gpName"
            label="GP Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="time"
            name="time"
            label="Time"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="date"
            name="date"
            label="Date"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}





export function BasicTable({ appointments, onUpdateAppointment, onUpdateSlot }) {
  const handleOnReject = (id, gpId, slotId, gpName, time, date) => {
    onUpdateSlot(slotId);
    onUpdateAppointment(id, gpId, slotId, gpName, time, date, "Rejected");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Reason</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Accept</TableCell>
            <TableCell align="right">Reject</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.filter(row => row.status !== "Rejected").map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {/* view patient  {row.patientId} profile */}
                <ViewProfile patientId={row.patientId} ifReadOnly={true} />
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.reason}</TableCell>
              <TableCell align="right">{row.status.toUpperCase()}</TableCell>
              <TableCell align="right">
                <Button variant="outlined"
                  disabled={row.status === "done"}
                  color={row.status === "done" ? "secondary" : "primary"}
                  onClick={() => onUpdateAppointment(row.id, row.gpId, row.slotId, row.gpName, row.time, row.date, "Accepted")}
                >
                  Accept
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined"
                  disabled={row.status === "done"}
                  color={row.status === "done" ? "secondary" : "primary"}
                  onClick={() => handleOnReject(row.id, row.gpId, row.slotId, row.gpName, row.time, row.date)}
                >
                  Reject
                </Button>
              </TableCell>
              <TableCell align="right">
                <AlternativeComponent
                  appointment={row}
                  onUpdateAppointment={onUpdateAppointment}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



export function HandleAppointmentPage() {
  const { data, isLoading, error, refetch } = useHandleAppointmentQuery(sessionStore.getState().uid);
  const { mutate: mutateAppointment, isSuccess } = useUpdateAppointmentMutation();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { mutate: mutateSlot, isLoad, isError } = useUpdateSlotMutation();

  useEffect(() => {
    if (isSuccess) {
      setShouldRefetch(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);  // 重置状态，确保不会无限循环触发 refetch
    }
  }, [shouldRefetch, refetch]);

  if (error) return <h4>Error: {error.message}, retry again</h4>;
  if (isLoading) return <h4>...Loading data</h4>;

  const appointments = data.sort((a, b) => {
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

  const handleUpdateAppointment = (appointmentId, gpId, slotId, gpName, time, date, status) => {
    mutateAppointment({
      appointmentId,
      gpId,
      slotId,
      gpName,
      time,
      date,
      status,
    });
  };

  const handleUpdateSlot = (sId) => {
    // console.log("last place:" + sId + " " + pId);
    mutateSlot({
      slotId: sId,
      bookedByPID: null,
      status: "open"
    });
  };

  return (
    <div>
      <h1>Appointment</h1>
      <BasicTable
        appointments={appointments}
        onUpdateAppointment={handleUpdateAppointment}
        onUpdateSlot={handleUpdateSlot}
      />
    </div>
  );
}
