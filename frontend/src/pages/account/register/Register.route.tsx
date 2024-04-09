import { RouteObject } from "react-router-dom";
import { SignUpPage } from "./SignUp.ui";

export const registerRoute: RouteObject = {
    path: '/sign-up',
    element: <SignUpPage />,
}

