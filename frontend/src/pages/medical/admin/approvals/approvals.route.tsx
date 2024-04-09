import { RouteObject } from "react-router-dom";
import { ApprovalsPage } from "./approvals.ui";

export const approvalsRoute: RouteObject = {
    path: 'approvals',
    element: <ApprovalsPage />,
}