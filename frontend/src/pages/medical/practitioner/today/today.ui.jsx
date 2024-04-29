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
// import ViewProfile from "../../general/generalProfile.ui";
  
  
  

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
              const name=formJson.name;
              const date=formJson.date;
              const time=formJson.time;
              const description=formJson.description;
            //   console.log(gpId,slotId,gpName,time,date);
              onAddTest(patientId,appointmentId,name,date,time,description)
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

  export function TodayAppointmentTable({appointments, onAddTest, onUpdateStatus}) {
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
                    {appointments.map((row, index) => (
                        <>
                            <TableRow key={`${row.id}-info`} sx={{ backgroundColor: index % 2 ? '#f9f9f9' : '#ffffff' }}>
                                <TableCell component="th" scope="row">{row.patientId}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">{row.reason}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                    <Button variant="outlined" onClick={() => onUpdateStatus(row.id, "Done")}>
                                        Done
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow key={`${row.id}-actions`} sx={{ backgroundColor: index % 2 ? '#f9f9f9' : '#ffffff', borderBottom: 'none', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                                <TableCell colSpan={6} style={{ paddingTop: 0, paddingBottom: 0 }}>
                                    <Box display="flex" justifyContent="space-around" width="100%">
                                        <AddTest appointment={row} onAddTest={onAddTest} />
                                        <ViewProfile patientId={row.patientId} ifReadOnly={true} />
                                        <Button variant="outlined">Create Prescription</Button>
                                        <Button variant="outlined">View Medical History</Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
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
            />
        </div>
    );
}
