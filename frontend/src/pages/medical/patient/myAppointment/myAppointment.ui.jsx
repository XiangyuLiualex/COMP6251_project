import { Table, TableContainer } from "@mui/material";
import { sessionStore } from "../../../../entities/session";
  import * as React from "react";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
import { useMyAppointmentQuery } from "../../../../entities/patient/appointment.query";
import { usePrescriptionQuery } from "../../../../entities/general/prescription.query";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddTestMutation, useTestByAppointmentQuery } from "../../../../entities/practitioner/test.query";
import { ViewProfile } from "../../general/generalProfile.ui";
import { useUpdateAppointmentStatusMutation } from "../../../../entities/practitioner/handleAppointment.query";
import { Box } from "@mui/material";
import { useAddPrescriptionMutation } from "../../../../entities/general/prescription.query";
import { MedicalHistoryPage } from "../../common/MedicalHistory.tsx";
import FullFeaturedCrudGrid from "../../patient/selfRegister/form.tsx"
import { PatientTestTable } from "../medicalTests/medicalTests.ui.jsx";

export function ViewTests({ appointmentId }) {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading, error, refetch } =useTestByAppointmentQuery(appointmentId)
    if (error) return <h4>Error: {error.message}, retry again</h4>;
    if (isLoading) return <h4>...Loading data</h4>;
  const tests=data;

  console.log("ViewPrescription",data)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        View Test
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-paper': { width: '60%', maxWidth: 'none' }, // 调整宽度
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
          {"Your Test"}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <PatientTestTable 
                  tests={tests}
                  status={"undo"}
           />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}


export function ViewPrescription({ appointmentId }) {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading, error, refetch } =usePrescriptionQuery(appointmentId)
  if (error) return <h4>Error: {error.message}, retry again</h4>;
    if (isLoading) return <h4>...Loading data</h4>;
  const prescription=data;
  console.log("ViewPrescription",data)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        View Prescription
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-paper': { width: '60%', maxWidth: 'none' }, // 调整宽度
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
          {"Your Prescrition"}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <PrescriptionTable appointmentId={appointmentId}/>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}

function PrescriptionTable({appointmentId}){
  const { data, isLoading, error, refetch } =usePrescriptionQuery(appointmentId)
    if (error) return <h4>Error: {error.message}, retry again</h4>;
    if (isLoading) return <h4>...Loading data</h4>;
  const prescription=data;
  console.log("ViewPrescription",data)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Medication Name</TableCell>
            <TableCell align="right">Medication Instruction</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prescription.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.medicationName}
              </TableCell>
              <TableCell align="right">{row.medicationInstruction}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function MyAppointmentTable({ appointments, status }) {
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
          {appointments.filter(appointment => 
            status === "done" ? appointment.status === "done" : appointment.status !== "done"
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
              <TableCell align="right">{row.status.toUpperCase()}</TableCell>
              <TableCell align="right">
              {status === "done" && <ViewPrescription appointmentId={row.id}/>}
              {status === "done" && <ViewTests appointmentId={row.id}/>}
              </TableCell>
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
    // console.log("myAppointment",data)
  
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

    return (
        <div>
            <h1>Medical Tests</h1>
            <h2>Incoming Application</h2>
            <MyAppointmentTable 
                        appointments={appointments}
                        status={"undo"}
            />
            <h2>Done Application</h2>
            <MyAppointmentTable 
                        appointments={appointments}
                        status={"done"}
            />
        </div>
    )
}

