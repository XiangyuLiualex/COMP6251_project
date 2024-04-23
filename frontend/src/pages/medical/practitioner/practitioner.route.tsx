import { RouteObject } from "react-router-dom"
import { gpRoute } from "./gp.route"
// only gp for now 

export const practitionerMedicalRoute: RouteObject = {
    path: 'practitioner',
    children: [
        gpRoute
    ]
}