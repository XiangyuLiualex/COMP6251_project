
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

function ConfirmBox(){
    return(
        <form>
            <h2>What is the reason for this appointment</h2>
            <input type="text" placeholder="Berifly describe your problem here..." />
            <button>Submit</button>
        </form>
    )
}

function DaySchedule({ schedule }) {
    return (
      <td>
        <h4>{schedule.date}</h4>
        <h5>{schedule.dayOfWeek}</h5>
        
        <ul>
          {schedule.slots.map((slot, index) => (
            slot.bookedByPID === null && (
              <li key={index}>
              <button >{slot.time}</button>
              </li>
            )
          ))}
        </ul>
      </td>
    );
  }
  
  function WeekSchedule({ schedules }) {
    return (
      <table>
        <tbody>
          <tr>
            {schedules.map((schedule, index) => (
              <DaySchedule key={index} schedule={schedule} />
            ))}
          </tr>
        </tbody>
      </table>
    );
  }


function GPBox({gp}){
    return(
        <tr>
            <td>{gp.name}</td>
            <td>{gp.Treatments}</td>
            <td>Year in practice: {gp.yearsInPractice}</td>
            <td>
                <button>Book Online</button>
                <button>Consult By Call</button>
            </td>
        </tr>
    )
}


function GPSBox({gps,type}){
    const rows = [];
    if(type=="healthComplaint"){
        gps.forEach((gp)=>{
            if(gp.yearsInPractice<=3){
                rows.push(
                    <GPBox
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
                    <GPBox
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

function InitialBox(){
    return(
        <div>
            <h2>Please choose your appointment type: </h2>
            <button>Illness</button>
            <button>Health Complaint</button>
        </div>
    )
}

export function AppointmentPage() {
    return (
        <div>
            <h1>Appointment Page</h1>
            {/* <InitialBox/> */}
            {/* <GPSBox gps={GPS} type="healthComplaint"/> */}
            {/* <WeekSchedule schedules={GPS[0].schedule}/> */}
            <ConfirmBox/>
        </div>
    );
}