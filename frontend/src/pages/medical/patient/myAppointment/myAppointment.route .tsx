import { RouteObject } from "react-router-dom";
import { MyAppointmentPage} from "../myAppointment/myAppointment.ui";

export const myAppointmentRoute: RouteObject = {
    path: 'myAppointment',
    element: <MyAppointmentPage/>,
    //todo add role based check and redirect
}