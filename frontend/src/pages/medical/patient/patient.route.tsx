import { RouteObject } from "react-router-dom";
import { MedicalGenericLayout } from "../common";
import { profileRoute } from "./profile";
import { medicalHistoryRoute } from "./medicalHistory";
import { medicalTestsRoute } from "./medicalTests";
import { selfRegisterRoute } from "./selfRegister";
import { appointmentRoute } from "./appointment";

//todo add role based check and redirect
export const patientMedicalRoute: RouteObject = {
    path: 'patient',
    element: <MedicalGenericLayout />,
    children: [
        profileRoute,
        appointmentRoute,
        medicalHistoryRoute,
        medicalTestsRoute,
        selfRegisterRoute
    ]
}