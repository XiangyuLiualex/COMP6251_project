import { RouteObject } from "react-router-dom";
import { PatientProfilePage } from "./profile.ui";
import { createElement } from "react";

export const profileRoute: RouteObject = {
    path: 'profile',
    element: createElement(PatientProfilePage)
}