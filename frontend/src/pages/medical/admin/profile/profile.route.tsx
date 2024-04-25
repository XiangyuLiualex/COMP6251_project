import { RouteObject } from "react-router-dom";
import { AdminProfilePage } from "./profile.ui";

export const adminProfileRoute: RouteObject = {
    path: 'profile',
    element: <AdminProfilePage />,
}