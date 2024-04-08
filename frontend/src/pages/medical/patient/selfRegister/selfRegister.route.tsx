import { RouteObject } from "react-router-dom";
import { SelfRegisterPage } from "./selfRegister.ui";

export const selfRegisterRoute: RouteObject = {
    path: 'self-register',
    element: <SelfRegisterPage />
}