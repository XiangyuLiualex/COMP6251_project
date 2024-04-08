import { RouteObject } from "react-router-dom";
import { AppointmentPage } from "./appointment.ui";

export const appointmentRoute: RouteObject = {
    path: 'appointment',
    element: <AppointmentPage />,
    //todo add role based check and redirect
}