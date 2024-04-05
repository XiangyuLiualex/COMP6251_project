import { RouteObject } from "react-router-dom";
import { AdminPage } from "./admin.ui";

export const adminMedicalRoute: RouteObject = {
    path: '/admin',
    element: <AdminPage />,
}