import { useState } from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';




const GPS =[
    {name:"GP1", GId:"G001",Treatments:"Internal Medicine Treatment", yearsInPractice:4, Phone:"+44 123123123", 
    schedule: [
        {date: "2024-05-06", dayOfWeek: "Monday", slots: [{time: "8:00-9:00", bookedByPID: "001"}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-07", dayOfWeek: "Tuesday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-08", dayOfWeek: "Wednesday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-09", dayOfWeek: "Thursday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-10", dayOfWeek: "Friday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]}
      ]},
      {name:"GP2",GId:"G002", Treatments:"Surgical Treatment", yearsInPractice:8, Phone:"+44 5231252343", schedule: [
        {date: "2024-05-06", dayOfWeek: "Monday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-07", dayOfWeek: "Tuesday", slots: [{time: "8:00-9:00", bookedByPID: "002"}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-08", dayOfWeek: "Wednesday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-09", dayOfWeek: "Thursday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-10", dayOfWeek: "Friday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]}
      ]},
      {name:"GP3", GId:"G003",Treatments:"Psychotherapy", yearsInPractice:1, Phone:"+44 552232343", schedule: [
        {date: "2024-05-06", dayOfWeek: "Monday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-07", dayOfWeek: "Tuesday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-08", dayOfWeek: "Wednesday", slots: [{time: "8:00-9:00", bookedByPID: "003"}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-09", dayOfWeek: "Thursday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-10", dayOfWeek: "Friday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]}
      ]},
      {name:"GP4", GId:"G004",Treatments:"Skin Care Treatment", yearsInPractice:2, Phone:"+44 46352252343", schedule: [
        {date: "2024-05-06", dayOfWeek: "Monday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-07", dayOfWeek: "Tuesday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-08", dayOfWeek: "Wednesday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-09", dayOfWeek: "Thursday", slots: [{time: "8:00-9:00", bookedByPID: "004"}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]},
        {date: "2024-05-10", dayOfWeek: "Friday", slots: [{time: "8:00-9:00", bookedByPID: null}, {time: "9:00-10:00", bookedByPID: null}, {time: "10:00-11:00", bookedByPID: null}, {time: "11:00-12:00", bookedByPID: null}, {time: "13:00-14:00", bookedByPID: null}, {time: "14:00-15:00", bookedByPID: null}, {time: "15:00-16:00", bookedByPID: null}, {time: "16:00-17:00", bookedByPID: null}]}
      ]}
];

function DoubleConfirm({name,date,time,reason}){
    return(
        <div>
            <h2>Please confirm your booking information: </h2>
            <h3>GP name: {name}</h3>
            <h3>Date Selected: {date}</h3>
            <h3>Time Selected: {time}</h3>
            <h3>Booking Reason: {reason}</h3>
            <button>Submit</button>
        </div>
    )
}

function ConfirmBox({reasonText, onSubmit, onReasonText}){
    return(
        <div>
            <h2>What is the reason for this appointment</h2>
            <input type="text" value={reasonText} placeholder="Berifly describe your problem here..." onChange={onReasonText} />
            <button onClick={()=>onSubmit()}>Submit</button>
        </div>
    )
}

function DaySchedule({onSlotSelect,schedule }) {
    return (
      <td>
        <h4>{schedule.date}</h4>
        <h5>{schedule.dayOfWeek}</h5>
        
        <ul>
          {schedule.slots.map((slot, index) => (
            slot.bookedByPID === null && (
              <li key={index}>
              <button onClick={()=>onSlotSelect({date:schedule.date, time:slot.time})}>{slot.time}</button>
              </li>
            )
          ))}
        </ul>
      </td>
    );
  }
  
  function WeekSchedule({ onSlotSelect, schedules}) {
    return (
      <table>
        <tbody>
          <tr>
            {schedules.map((schedule, index) => (
              <DaySchedule onSlotSelect={onSlotSelect} key={index} schedule={schedule} />
            ))}
          </tr>
        </tbody>
      </table>
    );
  }


function GPBox({onGpSelect, gp}){
    return(
        <tr>
            <td>{gp.name}</td>
            <td>{gp.Treatments}</td>
            <td>Year in practice: {gp.yearsInPractice}</td>
            <td>
                <button onClick={()=>onGpSelect(gp)}>Book Online</button>
                <button>Consult By Call</button>
            </td>
        </tr>
    )
}


function GPSBox({onGpSelect, gps,type}){
    const rows = [];
    if(type==="healthComplaint"){
        gps.forEach((gp)=>{
            if(gp.yearsInPractice<=3){
                rows.push(
                    <GPBox onGpSelect={onGpSelect}
                        gp={gp}
                        key={gp.GId}
                    />
                );
            }
        })
    }else{
        gps.forEach((gp)=>{
            if(gp.yearsInPractice>3){
                rows.push(
                    <GPBox onGpSelect={onGpSelect}
                        gp={gp}
                        key={gp.GId}
                    />
                );
            }
        })
    }
    return(
        <div>
            <h3>GPs that match your choice: </h3>
            <div>{rows}</div>
        </div>
    )
}

function InitialBox({onTypeSelect}){
    return(
        <div>
            <h2>Please choose your appointment type: </h2>
            <button onClick={()=>onTypeSelect("illness")}>Illness</button>
            <button onClick={()=>onTypeSelect("healthComplaint")}>Health Complaint</button>
        </div>
    )
}

export function AppointmentPage() {
    const [currentBox, setCurrentBox]=useState("Initial");
    const [type, setType]=useState(null);
    const [gpSelect,setGpSelect]=useState(null);
    const [slotSelect,setSlotSelect]=useState(null);
    const [reasonText, setReasonText]=useState("");
    const{data, isLoading, error} = useQuery("speakers", 
    ()=>(axios("http://localhost:3001/gps")));
    if(error) return <h4>Error:{error.message}, retry again</h4>;
    if(isLoading) return<h4>...Loading data</h4>
    console.log(data)
    



    const handleTypeSelect=(type)=>{
        setCurrentBox("GPS");
        setType(type);
    };

    const handleGpSelect=(gp)=>{
        const theGp=JSON.parse(JSON.stringify(gp));
        setCurrentBox("schedule");
        setGpSelect(theGp);
    }

    const handleSlotSelect=(slot)=>{
        setCurrentBox("confirm");
        setSlotSelect(slot);
    }

    const handleReasonText = (event) => {
        setReasonText(event.target.value);
      };

    const handleSubmit=()=>{
        console.log("This is the booking information: \nGP name:"+gpSelect.name+"\nGP ID: "
        +gpSelect.GId+"\n Date Selected: "+slotSelect.date+"\n time Selected: "+slotSelect.time+"\nBooking Reason: "+reasonText);
       setCurrentBox("doubleConfirm");
    }

    return (
        <>
        <h1>Displaying GPS Information</h1>
        <ul>
        {data.data.map(speaker => (
          <li key={speaker.id}>
            {speaker.name},  <em> {speaker.Treatments} </em>
          </li>
        ))}
      </ul>
          </>  );

    switch(currentBox){
        case 'Initial':
            return (
                <div>
                    <h1>Appointment Page</h1>
                    <InitialBox onTypeSelect={handleTypeSelect}/>
                </div>
            );
        case 'GPS':
            return (
                <div>
                    <h1>Appointment Page</h1>
                    <GPSBox onGpSelect={handleGpSelect} gps={GPS} type={type}/>
                </div>
            );
        case 'schedule':
            return (
                <div>
                    <h1>Appointment Page</h1>
                    <WeekSchedule onSlotSelect={handleSlotSelect} schedules={gpSelect.schedule}/>
                </div>
            );
        case 'confirm':
            return (
                <div>
                    <h1>Appointment Page</h1>
                    <h3>You have select appointment with: </h3>
                    <h4>{gpSelect.name}</h4>
                    <h3> Your have select time slot:</h3>
                    <h4>{slotSelect.date}</h4>
                    <h4>{slotSelect.time}</h4>
                    <ConfirmBox reasonText={reasonText} onSubmit={handleSubmit} onReasonText={handleReasonText}/>
                </div>
            );
        case 'doubleConfirm':
            return (
                <div>
                    <h1>Appointment Page</h1>
                    <DoubleConfirm name={gpSelect.name} date={slotSelect.date} time={slotSelect.time} reason={reasonText}/>
                </div>
            );

    }
}