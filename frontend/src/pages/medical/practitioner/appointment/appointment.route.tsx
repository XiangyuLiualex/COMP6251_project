import { RouteObject } from "react-router-dom";
import { AppointmentPage } from "./appoitnment.ui";
import { createElement } from "react";

export const AppointmentRoute: RouteObject = {
    path: 'appointment',
    element: createElement(AppointmentPage)
}