import { RouteObject } from "react-router-dom";
import { MapPage } from "./map.ui";

export const mapRoute: RouteObject = {
    path: 'map',
    element: <MapPage />,
}