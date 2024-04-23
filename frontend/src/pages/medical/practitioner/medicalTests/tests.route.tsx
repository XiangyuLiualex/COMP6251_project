import { createElement } from "react";
import { RouteObject } from "react-router-dom";
import { MedicalTestsPage } from "./tests.ui";

export const TestsRoute: RouteObject = {
    path: "tests",
    element: createElement(MedicalTestsPage)
}