import { createElement } from "react";
import { RouteObject } from "react-router-dom";
import { GpProfilePage } from "./profile.ui";

export const Practitioner_ProfileRoute: RouteObject = {
    path: 'profile',
    element: createElement(GpProfilePage)
} 