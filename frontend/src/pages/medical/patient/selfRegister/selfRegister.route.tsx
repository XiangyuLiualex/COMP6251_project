import { RouteObject } from "react-router-dom";
import { SelfRegisterPage } from "./selfRegister.ui";
import { pathKeys } from "../../config/path";

export const selfRegisterRoute: RouteObject = {
    path: pathKeys.patient.selfRegister(),
    element: <SelfRegisterPage />
}