import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "../component/homepage/homepage";
import { Login, Profile } from "../component/account";
import NotFound from "../component/error/notfound";
import { adminMedicalRoute } from "../component/medical/admin";
import { patientMedicalRoute } from "../component/medical/patient";
import { registerRoute } from "../component/account/register";

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
