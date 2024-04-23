import { RouteObject, redirect } from "react-router-dom";
import { GenericLayout } from "../common"
import { Practitioner_ProfileRoute } from "./profile"
import { AppointmentRoute } from "./appointment"
import { sessionStore } from "../../../entities/session"
import { TodayRoute } from "./today"
import { TestsRoute } from "./medicalTests"


export const gpRoute: RouteObject = {
    // todo path add to pathkeys
    path: 'gp',
    element: <GenericLayout role="gp" />,
    children: [
        Practitioner_ProfileRoute,
        AppointmentRoute,
        TodayRoute,
        TestsRoute
    ],
    loader: (args) => {
        const { token, role } = sessionStore.getState()
        if (token === null) {
            return redirect('/login')
        }
        if (role !== 'gp') {
            return redirect(`/${role}`)
        }
        return args
    }

}