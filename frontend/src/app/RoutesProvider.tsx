import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/homepage/homepage";
import { Login, Profile } from "../pages/account";
import NotFound from "../pages/error/notfound";
import { adminMedicalRoute } from "../pages/medical/admin";
import { patientMedicalRoute } from "../pages/medical/patient";
import { registerRoute } from "../pages/account/register";

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    children: [
      registerRoute,
      adminMedicalRoute,
      patientMedicalRoute,
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ]
  },
]);

export function RoutesProvider() {
  return <RouterProvider router={router} />;
}
