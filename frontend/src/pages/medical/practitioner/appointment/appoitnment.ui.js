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

function AlternativeComponent({appointment,onUpdateAppointment}){
  const [open, setOpenAlt] = React.useState(false);
  const handleClickOpen = () => {
    setOpenAlt(true);
  };
  const handleClose = () => {
    setOpenAlt(false);
  };
  console.log(appointment.id);
  // gpId,slotId,gpName,time,date,status
  const handleonUpdate=(formJson,appointment)=>{
    console.log(appointment);
    const updateData={};
    updateData.id=appointment.id;
    if(formJson.gpId!=='') updateData.gpId=formJson.gpId;
    if(formJson.slotId!=='') updateData.slotId=formJson.slotId;
    if(formJson.gpName!=='') updateData.gpName=formJson.gpName;
    if(formJson.time!=='') updateData.time=formJson.time;
    const dataToSend={...appointment, ...updateData};
    onUpdateAppointment(dataToSend.id,dataToSend.gpId,dataToSend.slotId,dataToSend.gpName,dataToSend.time,dataToSend.date,"Approved");
  }
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
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
            // const gpId = formJson.gpId;
            // const slotId=formJson.slotId;
            // const gpName=formJson.gpName;
            // const time=formJson.time;
            // const date=formJson.date;
            // console.log(gpId,slotId,gpName,time,date);
            handleonUpdate(formJson,appointment);

            // console.log(slotId==="");
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





export function BasicTable({ appointments, onUpdateAppointment}) {


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
                <Button variant="outlined"
                  onClick={() =>
                    onUpdateAppointment(row.id,row.gpId,row.slotId,row.gpName,row.time,row.date, "Approved")}
                >
                  Accept
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined"
                  onClick={() =>
                    onUpdateAppointment(row.id,row.gpId,row.slotId,row.gpName,row.time,row.date, "Rejected")}
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
  const {mutate: mutateAppointment,isLoad,isError,isSuccess,} = useUpdateAppointmentMutation();
  

  if (error) return <h4>Error:{error.message}, retry again</h4>;
  if (isLoading) return <h4>...Loading data</h4>;
  console.log(data);
  const appointments = data;

  if (isSuccess) {
    // isSuccess 变为 true 时执行的函数
    refetch();
    // 可在这里调用需要执行的函数
  }
  const handleUpdateAppointment = (appointmentId,gpId,slotId,gpName,time,date,status) => {
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
      />
    </div>
  );
}
