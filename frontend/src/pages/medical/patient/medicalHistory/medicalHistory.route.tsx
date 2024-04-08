import { RouteObject } from "react-router-dom";
import { MedicalHistoryPage } from "./medicalHistory.ui";

export const medicalHistoryRoute: RouteObject = {
    path: 'medical-history',
    element: <MedicalHistoryPage />
}
