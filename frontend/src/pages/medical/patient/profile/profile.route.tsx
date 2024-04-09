import { RouteObject } from "react-router-dom";
import { ProfilePage } from "./profile.ui";
import { createElement } from "react";

export const profileRoute: RouteObject = {
    path: 'profile',
    element: createElement(ProfilePage)
}