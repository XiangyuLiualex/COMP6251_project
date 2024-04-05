import { RouteObject } from "react-router-dom";
import { PatientPage } from "./patient.ui";

export const patientMedicalRoute: RouteObject = {
    path: '/patient',
    element: <PatientPage />,
    //todo add role based check and redirect
}