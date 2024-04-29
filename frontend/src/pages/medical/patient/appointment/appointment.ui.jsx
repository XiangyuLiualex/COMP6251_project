import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { sessionStore } from "../../../../entities/session";
// import useUpdateSlotMutation from "../../../../entities/patient/appointment.query";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import useUpdateSlotMutation, { useAppointmentQuery, useSubmitAppointmentMutation } from "../../../../entities/patient/appointment.query";

export function DoubleConfirm({ gpName, date, time, reason, slotId, patientId, gpId, isError, isLoad, isSuccess, onUpdateSlot, onSubmitAppointment }) {
  const handleOnSubmit = () => {
    onUpdateSlot(slotId, patientId)
    onSubmitAppointment(patientId, gpId, slotId, gpName, time, date, reason)
  }
  console.log(patientId, gpId, slotId, gpName, time, date, reason);
  return (
    <div>
      <h2>Please confirm your booking information: </h2>
      <h3>GP name: {gpName}</h3>
      <h3>Date Selected: {date}</h3>
      <h3>Time Selected: {time}</h3>
      <h3>Booking Reason: {reason}</h3>
      <button onClick={handleOnSubmit} disabled={isLoad}>
        Submit
      </button>

      {isError && <p>An error occurred: {isError.message}</p>}
      {isSuccess && <p>Slot updated successfully!</p>}
    </div>
  );
}

function ConfirmBox({ reasonText, onSubmit, onReasonText }) {
  return (
    <div>
      <h2>What is the reason for this appointment</h2>
      <input
        type="text"
        value={reasonText}
        placeholder="Berifly describe your problem here..."
        onChange={onReasonText}
      />
      <button onClick={() => onSubmit()}>Submit</button>
    </div>
  );
}

// {
//   "id": "6",
//   "gpId": "1",
//   "date": "2024-05-06",
//   "dayOfWeek": "Monday",
//   "time": "14:00-15:00",
//   "bookedByPID": null
// }

function DaySchedule({ onSlotSelect, daySlots }) {
  // console.log(daySlots);
  // console.log(daySlots[0].bookedByPID === null);
  //onSlotSelect, schedule

  return (
    <td>

      <ul>
        <h4>{daySlots[0].date}</h4>
        <h5>{daySlots[0].dayOfWeek}</h5>
        {daySlots.map(
          (slot, index) =>
            slot.status === "open" && (
              <li key={index}>
                <button
                  onClick={() =>
                    onSlotSelect({ date: slot.date, time: slot.time, id: slot.id })
                  }
                >
                  {slot.time}
                </button>
              </li>
            )
        )}
      </ul>
    </td>
  );
}

function WeekSchedule({ onSlotSelect, weekSlots }) {
  weekSlots.sort((a, b) => a.id - b.id);
  const slots = weekSlots.reduce((acc, slot) => {
    // 查找当前日期是否已经有对应的分组
    const existingGroup = acc.find(group => group[0].date === slot.date);
    if (existingGroup) {
      // 如果存在，将当前slot添加到该组
      existingGroup.push(slot);
    } else {
      // 如果不存在，创建新的组并添加到accumulator
      acc.push([slot]);
    }
    return acc;
  }, []);
  console.log(slots);

  return (
    <table>
      <tbody>
        <tr>
          {slots.map((slot, index) => (
            <DaySchedule
              onSlotSelect={onSlotSelect}
              key={index}
              daySlots={slot}
            />
          ))}
        </tr>
      </tbody>
    </table>
  );
}

function GPBox({ onGpSelect, gp }) {
  return (
    <tr>
      <td>{gp.name}</td>
      <td>{gp.Treatments}</td>
      <td>Year in practice: {gp.yearsInPractice}</td>
      <td>
        <button onClick={() => onGpSelect(gp)}>Book Online</button>
        <button>Consult By Call</button>
      </td>
    </tr>
  );
}

function GPSBox({ onGpSelect, gps, type }) {
  const rows = [];
  if (type === "healthComplaint") {
    gps.forEach((gp) => {
      if (gp.yearsInPractice <= 3) {
        rows.push(<GPBox onGpSelect={onGpSelect} gp={gp} key={gp.id} />);
      }
    });
  } else {
    gps.forEach((gp) => {
      if (gp.yearsInPractice > 3) {
        rows.push(<GPBox onGpSelect={onGpSelect} gp={gp} key={gp.id} />);
      }
    });
  }
  return (
    <div>
      <h3>GPs that match your choice: </h3>
      <div>{rows}</div>
    </div>
  );
}

function InitialBox({ onTypeSelect }) {
  return (

    <div>
      <h2>Please choose your appointment type: </h2>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => onTypeSelect("illness")}>Illness</Button>
        <Button variant="contained" onClick={() => onTypeSelect("healthComplaint")}>
          Health Complaint
        </Button>
      </Stack>
    </div>
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
  const { data, isLoading, error } = useAppointmentQuery()




  if (error) return <h4>Error:{error.message}, retry again</h4>;
  if (isLoading) return <h4>...Loading data</h4>;
  // console.log(data);
  const GPS = data;

  const handleUpdateSlot = (sId, pId) => {
    console.log("last place:" + sId + " " + pId);
    mutateSlot({
      slotId: sId,
      bookedByPID: pId,
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

  // return (
  //   <>
  //     <h1>Displaying GPS Information</h1>
  //     <ul>
  //       {data.map((speaker) => (
  //         <li key={speaker.id}>
  //           {speaker.name}, <em> {speaker.Treatments} </em>
  //         </li>
  //       ))}
  //     </ul>
  //   </>
  // );

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
          <h1>Appointment Page</h1>
          <GPSBox onGpSelect={handleGpSelect} gps={GPS} type={type} />
        </div>
      );
    case "schedule":
      return (
        <div>
          <h1>Appointment Page</h1>
          <WeekSchedule
            onSlotSelect={handleSlotSelect}
            weekSlots={gpSelect.slots}
          />
        </div>
      );
    case "confirm":
      return (
        <div>
          <h1>Appointment Page</h1>
          <h3>You have select appointment with: </h3>
          <h4>{gpSelect.name}</h4>
          <h3> Your have select time slot:</h3>
          <h4>{slotSelect.date}</h4>
          <h4>{slotSelect.time}</h4>
          <ConfirmBox
            reasonText={reasonText}
            onSubmit={handleSubmit}
            onReasonText={handleReasonText}
          />
        </div>
      );
    case "doubleConfirm":
      return (
        <div>
          <h1>Appointment Page</h1>
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
          />
        </div>
      );
  }
}



