import {
  useTodayAppointmentQuery,
} from "../../../../entities/practitioner/today.query";
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
import { useAddTestMutation } from "../../../../entities/practitioner/test.query";
import { ViewProfile } from "../../general/generalProfile.ui";
import { useUpdateAppointmentStatusMutation } from "../../../../entities/practitioner/handleAppointment.query";
import { Box } from "@mui/material";
import { useAddPrescriptionMutation } from "../../../../entities/general/prescription.query";
import { MedicalHistoryPage } from "../../common/MedicalHistory.tsx";
import FullFeaturedCrudGrid from "../../patient/selfRegister/form.tsx"
// import ViewProfile from "../../general/generalProfile.ui";

export function EditMedicalHistory({ patientId }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Medical History
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
          {"Edit Patient's Medical History:"}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          {console.log("Today" + patientId)}
          <FullFeaturedCrudGrid role="gp" id={patientId} data={null} />

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



export function ViewMedicalHistory({ patientId }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        View Medical History
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
          {"Patient's Medical History:"}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <MedicalHistoryPage id={patientId} />

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






function AddPrescription({ appointment, onAddPrescription }) {
  const [open, setOpenAlt] = React.useState(false);
  const handleClickOpen = () => {
    setOpenAlt(true);
  };
  const handleClose = () => {
    setOpenAlt(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Prescription
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
            const patientId = appointment.patientId;
            const appointmentId = appointment.id;
            const medicationName = formJson.medicationName;
            const medicationInstruction = formJson.medicationInstruction;
            const quantity = formJson.quantity;
            //   console.log(gpId,slotId,gpName,time,date);
            onAddPrescription(patientId, appointmentId, medicationName, medicationInstruction, quantity)
            handleClose();
          },
        }}
      //   patientId,appointmentId,medicationName,medicationInstruction,quantity
      >
        <DialogTitle>Add Prescription</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter Prescription informations:
          </DialogContentText>
          <TextField
            margin="dense"
            id="medicationName"
            name="medicationName"
            label="Medication Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="medicationInstruction"
            name="medicationInstruction"
            label="Medication Instruction"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantity"
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



function AddTest({ appointment, onAddTest }) {
  const [open, setOpenAlt] = React.useState(false);
  const handleClickOpen = () => {
    setOpenAlt(true);
  };
  const handleClose = () => {
    setOpenAlt(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Test
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
            const patientId = appointment.patientId;
            const appointmentId = appointment.id;
            const name = formJson.name;
            const date = formJson.date;
            const time = formJson.time;
            const description = formJson.description;
            //   console.log(gpId,slotId,gpName,time,date);
            onAddTest(patientId, appointmentId, name, date, time, description)
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Test</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter test informations:
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Test name"
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
            id="description"
            name="description"
            label="Description"
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

export function TodayAppointmentTable({ appointments, onAddTest, onUpdateStatus, onAddPrescription }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>PatientId</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Reason</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.filter(row => row.status !== "Rejected").map((row, index) => (
            <>
              <TableRow key={`${row.id}-info`} sx={{ backgroundColor: index % 2 ? '#f9f9f9' : '#ffffff' }}>
                <TableCell component="th" scope="row">{row.patientId}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.reason}</TableCell>
                <TableCell align="right">{row.status.toUpperCase()}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => onUpdateStatus(row.id, "done")}>
                    Done
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow key={`${row.id}-actions`} sx={{ backgroundColor: index % 2 ? '#f9f9f9' : '#ffffff' }}>
                <TableCell colSpan={6} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <Box display="flex" justifyContent="space-around" width="100%">
                    <AddTest appointment={row} onAddTest={onAddTest} />
                    <ViewProfile patientId={row.patientId} ifReadOnly={true} />

                    <AddPrescription appointment={row} onAddPrescription={onAddPrescription} />

                    <ViewMedicalHistory patientId={row.patientId} />
                    <EditMedicalHistory patientId={row.patientId} />
                    {/* <Button variant="outlined">Add Medical History</Button> */}
                  </Box>
                </TableCell>
              </TableRow>
              <br />
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




//   const { data, isLoading, isError, refetch } = useProfileQuery(id);

export function TodayPage() {
  const { data, isLoading, error, refetch } = useTodayAppointmentQuery(sessionStore.getState().uid, "2024-05-06");
  const { mutate: mutateAddTest, isLoading: isLoad, isError, isSuccess: isAddSuccess } = useAddTestMutation();
  const { mutate: mutateAppointmentStatus, isSuccess } = useUpdateAppointmentStatusMutation();
  const [shouldRefetch, setShouldRefetch] = React.useState(false);
  const { mutate: mutateAddPrescription } = useAddPrescriptionMutation();

  // 使用 useEffect 来观察 isSuccess 的变化，而不是在渲染逻辑中直接进行条件判断
  React.useEffect(() => {
    if (isSuccess) {
      setShouldRefetch(true);
    }
  }, [isSuccess]);

  React.useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetch]);

  if (error) return <h4>Error: {error.message}, please retry.</h4>;
  if (isLoading) return <h4>Loading data...</h4>;

  const handleAddPrescription = (patientId, appointmentId, medicationName, medicationInstruction, quantity) => {
    mutateAddPrescription({
      patientId: patientId,
      appointmentId: appointmentId,
      medicationName: medicationName,
      medicationInstruction: medicationInstruction,
      quantity: quantity
    });
  }

  const handleAddTest = (patientId, appointmentId, name, date, time, description) => {
    mutateAddTest({
      patientId: patientId,
      appointmentId: appointmentId,
      name: name,
      date: date,
      time: time,
      description: description
    });
  };

  const handleUpdateStatus = (appointmentId, status) => {
    mutateAppointmentStatus({
      appointmentId: appointmentId,
      status: status
    });
  };

  const appointments = data?.sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return parseInt(a.time.split(':')[0]) * 60 + parseInt(a.time.split(':')[1]) -
      parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]);
  });

  return (
    <div>
      <h1>Today's Appointments</h1>
      <TodayAppointmentTable
        appointments={appointments}
        onAddTest={handleAddTest}
        onUpdateStatus={handleUpdateStatus}
        onAddPrescription={handleAddPrescription}
      />
    </div>
  );
}
