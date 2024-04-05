import { RouteObject } from "react-router-dom";
import { RegisterPage } from "./Register.ui";

export const registerRoute: RouteObject = {
    path: '/register',
    element: <RegisterPage />,
}

