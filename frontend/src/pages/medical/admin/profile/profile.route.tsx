import { RouteObject } from "react-router-dom";
import { ProfilePage } from "./profile.ui";

export const adminProfileRoute: RouteObject = {
    path: 'profile',
    element: <ProfilePage />,
}