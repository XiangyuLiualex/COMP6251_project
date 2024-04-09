import { RouteObject, redirect } from "react-router-dom";
import { GenericLayout } from "../common";
import { profileRoute } from "./profile";
import { medicalHistoryRoute } from "./medicalHistory";
import { medicalTestsRoute } from "./medicalTests";
import { selfRegisterRoute } from "./selfRegister";
import { appointmentRoute } from "./appointment";
import { sessionStore } from "../../../entities/session";

//todo add role based check and redirect
export const patientMedicalRoute: RouteObject = {
    path: 'patient',
    element: <GenericLayout role="patient" />,
    children: [
        profileRoute,
        appointmentRoute,
        medicalHistoryRoute,
        medicalTestsRoute,
        selfRegisterRoute
    ],
    loader: (args) => {
        const { token, role } = sessionStore.getState()
        if (token === null) {
            return redirect('/login')
        }
        if (role !== 'patient') {
            return redirect(`/${role}`)
        }
        return args
    }
}