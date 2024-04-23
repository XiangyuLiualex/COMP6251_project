import { createElement } from "react";
import { RouteObject } from "react-router-dom";
import { TodayPage } from "./today.ui";

export const TodayRoute: RouteObject = {
    path: "today",
    element: createElement(TodayPage),
}