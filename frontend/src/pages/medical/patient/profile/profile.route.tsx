import { RouteObject } from "react-router-dom";
import { ProfilePage } from "./profile.ui";

export const profileRoute: RouteObject = {
    path: '/patient/profile',
    element: <ProfilePage />
}