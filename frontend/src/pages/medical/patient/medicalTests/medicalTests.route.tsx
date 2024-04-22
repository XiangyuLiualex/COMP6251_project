import { RouteObject } from "react-router-dom";
import { MedicalTestsPage } from "./medicalTests.ui";
import { pathKeys } from "../../config/path";

export const medicalTestsRoute: RouteObject = {
    path: pathKeys.patient.tests(),
    element: <MedicalTestsPage />
}