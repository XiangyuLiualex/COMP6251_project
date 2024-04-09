import { RouteObject, redirect } from "react-router-dom";
import { sessionStore } from "../../../entities/session";
import { GenericLayout } from "../common";
import { approvalsRoute } from "./approvals/approvals.route";
import { adminProfileRoute } from "./profile/profile.route";

export const adminMedicalRoute: RouteObject = {
    path: '/admin',
    element: <GenericLayout role="admin" />,
    children: [
        approvalsRoute,
        adminProfileRoute
    ],
    loader: (args) => {
        const { token, role } = sessionStore.getState()
        if (token === null) {
            return redirect('/login')
        }
        if (role !== 'admin') {
            return redirect(`/${role}`)
        }

        return args
    }
}