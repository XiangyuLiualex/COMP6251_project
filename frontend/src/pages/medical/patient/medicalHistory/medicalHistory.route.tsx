import { RouteObject } from "react-router-dom";
import { PatientMedicalHistoryPage } from "./medicalHistory.ui";

export const medicalHistoryRoute: RouteObject = {
    path: 'medical-history',
    element: <PatientMedicalHistoryPage />
}
