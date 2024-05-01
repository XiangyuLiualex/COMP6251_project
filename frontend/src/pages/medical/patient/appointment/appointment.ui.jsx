import { useState } from "react";
import { sessionStore } from "../../../../entities/session";
// import useUpdateSlotMutation from "../../../../entities/patient/appointment.query";
import Stack from '@mui/material/Stack';
import useUpdateSlotMutation, { useAppointmentQuery, useSubmitAppointmentMutation } from "../../../../entities/patient/appointment.query";
import { Table,TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle ,TableHead, TableBody, TableCell, TableRow, Button, Paper, Typography,Container,CardActions, Box,Grid, Card, CardContent,Collapse} from '@mui/material';
import { ViewProfile } from "../../general/generalProfile.ui";


export function DoubleConfirm({ gpName, date, time, reason, slotId, patientId, gpId, isError, isLoad, isSuccess, onUpdateSlot, onSubmitAppointment, onReset }) {
  const [open, setOpen] = useState(false);

  const handleOnSubmit = async () => {
    try {
      onUpdateSlot(slotId, patientId);
      await onSubmitAppointment(patientId, gpId, slotId, gpName, time, date, reason);
      setOpen(true);
    } catch (error) {
      console.error("Error during submission: ", error);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onReset("Initial");  // Assuming `onReset` will handle navigating back to the initial component
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
        Please confirm your booking information:
      </Typography>
      {/* Information display */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>GP name: {gpName}</Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Date Selected: {date}</Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Time Selected: {time}</Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>Booking Reason: {reason}</Typography>
      {/* Submit button */}
      <Button variant="contained" color="primary" onClick={handleOnSubmit} disabled={isLoad} fullWidth>
        {isLoad ? <CircularProgress size={24} /> : "Submit"}
      </Button>
      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Booking Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isSuccess ? "You have booked the appointment successfully" : "Sorry, something went wrong"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function ConfirmBox({ gpSelect, slotSelect, reasonText, onSubmit, onReasonText }) {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 , fontWeight: 'bold'}}>
        You have selected an appointment with:
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {gpSelect.name}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Your selected time slot:
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {slotSelect.date} at {slotSelect.time}
      </Typography>

      <Typography variant="h6" sx={{ mt: 2, mb: 2 ,fontWeight: 'bold'}}>
        What is the reason for this appointment?
      </Typography>
      <TextField
        fullWidth
        label="Describe your problem"
        placeholder="Briefly describe your problem here..."
        variant="outlined"
        value={reasonText}
        onChange={onReasonText}
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" onClick={onSubmit} fullWidth>
        Submit
      </Button>
    </Box>
  );
}

function DaySchedule({ onSlotSelect, daySlots }) {
  return (
    <TableCell>
      <Stack direction="column" spacing={1}>
        {daySlots.map((slot, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => slot.status === "open" ? onSlotSelect({ date: slot.date, time: slot.time, id: slot.id }) : null}
            disabled={slot.status !== "open"}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              backgroundColor: slot.status !== "open" ? '#e0e0e0' : '', // Change the background color for non-open slots
              color: slot.status !== "open" ? '#9e9e9e' : '', // Change text color for better readability on disabled buttons
              '&:hover': {
                backgroundColor: slot.status === "open" ? '#e3f2fd' : '#e0e0e0', // Maintain hover effect only for active buttons
              }
            }}
          >
            {slot.time}
          </Button>
        ))}
      </Stack>
    </TableCell>
  );
}

function WeekSchedule({ onSlotSelect, weekSlots }) {
  weekSlots.sort((a, b) => a.id - b.id);
  const slots = weekSlots.reduce((acc, slot) => {
    const existingGroup = acc.find(group => group[0].date === slot.date);
    if (existingGroup) {
      existingGroup.push(slot);
    } else {
      acc.push([slot]);
    }
    return acc;
  }, []);

  return (
    <Paper sx={{ overflowX: 'auto' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {slots.map((daySlots, index) => (
              <TableCell key={index}>
                <strong>{daySlots[0].date}</strong> - {daySlots[0].dayOfWeek}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {slots.map((slot, index) => (
              <DaySchedule
                onSlotSelect={onSlotSelect}
                key={index}
                daySlots={slot}
              />
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

function GPBox({ onGpSelect, gp }) {
  const [showPhone, setShowPhone] = useState(false); // State to track the visibility of the phone number

  const togglePhone = () => {
    setShowPhone(!showPhone); // Toggle the visibility state
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card raised sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Name: {gp.name}
          </Typography>
          <Typography variant="body1">
            Treatments: {gp.treatments}
          </Typography>
        </CardContent>
        <CardActions sx={{ flexDirection: 'column', alignItems: 'center', gap: 1, padding: 2 }}>
        <ViewProfile patientId={gp.id} ifReadOnly={true} />
        <br/>
          <Button size="small" variant="contained" color="primary" onClick={() => onGpSelect(gp)}>
            Book Online
          </Button>
          <Button size="small" variant="outlined" onClick={togglePhone}>
            Consult By Call
          </Button>
          <Collapse in={showPhone}>
            <Paper elevation={3} sx={{ padding: 1, marginTop: 1, width: '100%', textAlign: 'center' }}>
              <Typography variant="body2">
                Phone Number: {gp.phone}
              </Typography>
            </Paper>
          </Collapse>
          
        </CardActions>
      </Card>
    </Grid>
  );
}




function GPSBox({ onGpSelect, gps, type }) {
  const rows = gps.filter(gp => (type === "healthComplaint" ? gp.yearsInPractice <= 3 : gp.yearsInPractice > 3))
                  .map(gp => <GPBox onGpSelect={onGpSelect} gp={gp} key={gp.id} />);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        GPs that match your choice:
      </Typography>
      <Grid container spacing={2}>
        {rows}
      </Grid>
    </Box>
  );
}


function InitialBox({ onTypeSelect }) {
  return (
    <Container maxWidth="sm"> {/* Limit the max width for better focus and alignment */}
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}> {/* Adds shadow and padding for emphasis */}
        <Typography variant="h5" component="h2" gutterBottom> {/* Styled heading */}
          Please choose your appointment type:
        </Typography>
        <br/>
   
        <Stack spacing={2} direction="row" justifyContent="center"> {/* Centered buttons with spacing */}
          <Button variant="contained" color="primary" onClick={() => onTypeSelect("illness")}>
            Illness
          </Button>
          <Button variant="contained" color="primary" onClick={() => onTypeSelect("healthComplaint")}>
            Health Complaint
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export function AppointmentPage() {

  const [currentBox, setCurrentBox] = useState("Initial");
  const [type, setType] = useState(null);
  const [gpSelect, setGpSelect] = useState(null);
  const [slotSelect, setSlotSelect] = useState(null);
  const [reasonText, setReasonText] = useState("");
  const { mutate: mutateSlot, isLoad, isError, isSuccess } = useUpdateSlotMutation();
  const { mutate: mutateAppointment } = useSubmitAppointmentMutation();
  const { data, isLoading, error ,refetch} = useAppointmentQuery()




  if (error) return <h4>Error:{error.message}, retry again</h4>;
  if (isLoading) return <h4>...Loading data</h4>;
  // console.log(data);
  const GPS = data;

  const handleUpdateSlot = (sId, pId) => {
    // console.log("last place:" + sId + " " + pId);
    mutateSlot({
      slotId: sId,
      bookedByPID: pId,
      status:"hold"
    });
  };
  const handleSubmitAppointment = (patientId, gpId, slotId, gpName, time, date, reason) => {
    // console.log("Submitting appointment with:", { pId, gpId, slotId, gpName, time, date, reason });
    mutateAppointment({
      patientId: patientId,
      gpId: gpId,
      slotId: slotId,
      gpName: gpName,
      time: time,
      date: date,
      reason: reason
    });
  };

  const handleTypeSelect = (type) => {
    setCurrentBox("GPS");
    setType(type);
  };

  const handleGpSelect = (gp) => {
    const theGp = JSON.parse(JSON.stringify(gp));
    setCurrentBox("schedule");
    setGpSelect(theGp);
  };

  const handleSlotSelect = (slot) => {
    setCurrentBox("confirm");
    setSlotSelect(slot);
  };

  const handleReasonText = (event) => {
    setReasonText(event.target.value);
  };
  const onResetTo = (position) => {
    
    setCurrentBox(position);
    if(position==="Initial"){
      refetch();
    }
    // Reset other relevant states as needed
  };

  const handleSubmit = () => {
    console.log(
      "This is the booking information: \nGP name:" +
      gpSelect.name +
      "\nGP ID: " +
      gpSelect.GId +
      "\n Date Selected: " +
      slotSelect.date +
      "\n time Selected: " +
      slotSelect.time +
      "\nBooking Reason: " +
      reasonText
    );
    setCurrentBox("doubleConfirm");
  };


  switch (currentBox) {
    case "Initial":
      return (
        <div>
          <h1>Appointment Page</h1>
          <InitialBox onTypeSelect={handleTypeSelect} />
        </div>
      );
    case "GPS":
      return (
        <div>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <h1>Appointment Page</h1>
            <Button variant="contained" onClick={() => onResetTo("Initial")}>
              Back
            </Button>
          </Box>
          <GPSBox onGpSelect={handleGpSelect} gps={GPS} type={type} />
        </div>
      );
    case "schedule":
      return (
        <div>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <h1>Appointment Page</h1>
            <Button variant="contained" onClick={() => onResetTo("GPS")}>
              Back
            </Button>
          </Box>
          <WeekSchedule
            onSlotSelect={handleSlotSelect}
            weekSlots={gpSelect.slots}
          />
        </div>
      );
    case "confirm":
      return (
        <div>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <h1>Appointment Page</h1>
            <Button variant="contained" onClick={() => onResetTo("schedule")}>
              Back
            </Button>
          </Box>
          <ConfirmBox
            gpSelect={gpSelect}
            slotSelect={slotSelect}
            reasonText={reasonText}
            onSubmit={handleSubmit}
            onReasonText={handleReasonText}
          />
        </div>
      );
    case "doubleConfirm":
      return (
        <div>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <h1>Appointment Page</h1>
            <Button variant="contained" onClick={() => onResetTo("confirm")}>
              Back
            </Button>
          </Box>
          <DoubleConfirm
            gpName={gpSelect.name}
            date={slotSelect.date}
            time={slotSelect.time}
            reason={reasonText}
            slotId={slotSelect.id}
            patientId={sessionStore.getState().uid.toString()}
            gpId={gpSelect.id}
            isError={isError}
            isLoad={isLoad}
            isSuccess={isSuccess}
            onUpdateSlot={handleUpdateSlot}
            onSubmitAppointment={handleSubmitAppointment}
            onReset={onResetTo}
          />
        </div>
      );
  }
}



