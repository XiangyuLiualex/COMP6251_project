import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "../component/homepage/homepage";
import { Login, Profile } from "../component/account";
import NotFound from "../component/error/notfound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <NotFound />,
  },
]);

export function RoutesProvider() {
  return <RouterProvider router={router} />;
}
