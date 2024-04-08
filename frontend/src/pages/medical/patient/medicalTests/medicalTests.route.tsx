import { RouteObject } from "react-router-dom";
import { MedicalTestsPage } from "./medicalTests.ui";

export const medicalTestsRoute: RouteObject = {
    path: 'medical-tests',
    element: <MedicalTestsPage />
}