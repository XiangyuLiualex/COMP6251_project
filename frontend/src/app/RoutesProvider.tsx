import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/homepage/homepage";
import { Login } from "../pages/account";
import NotFound from "../pages/error/notfound";
import { adminMedicalRoute } from "../pages/medical/admin";
import { patientMedicalRoute } from "../pages/medical/patient";
import { registerRoute } from "../pages/account/register";
import { practitionerMedicalRoute } from "../pages/medical/practitioner";

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    children: [
      registerRoute,
      adminMedicalRoute,
      patientMedicalRoute,
      practitionerMedicalRoute,
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ]
  },
]);

export function RoutesProvider() {
  return <RouterProvider router={router} />;
}
