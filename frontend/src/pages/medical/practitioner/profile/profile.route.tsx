import { createElement } from "react";
import { RouteObject } from "react-router-dom";
import { ProfilePage } from "./profile.ui";

export const Practitioner_ProfileRoute: RouteObject = {
    path: 'profile',
    element: createElement(ProfilePage)
} 