import { useRoutes } from "react-router-dom";
import {
  ChangePassword,
  Error404,
  ForgotPassword,
  Login,
  ResetPassword,
  Welcome,
} from "./pages";
import { Layout } from "./layouts/Layout";
import { LoginLayout } from "./layouts/LoginLayout";
import RegisteredCar from "./pages/admin/RegisteredCar";
import { UserList } from "./pages/admin/UserList";
import AddCerti from "./pages/center/AddCerti";
import { UseAuth } from "./utils";

import StatisticalTime from "./pages/center/StatisticalTime";
import StatisticalExpired from "./pages/center/StatisticalExpired";
import AdminStatisticalRegistered from "./pages/admin/AdminStatisticalRegistered";
import AdminStatisticalExpired from "./pages/admin/AdminStatisticalExpired";
import { AdminStatisticalCar } from "./pages/admin/AdminStatisticalCar";
import { CenterStatisticalCar } from "./pages/center/CenterStatisticCar";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <LoginLayout />,
      children: [{ path: "", element: <Login /> }],
    },
    {
      path: "/user",
      element: <LoginLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "forgot-password", element: <ForgotPassword /> },
      ],
    },
    {
      path: "welcome",
      element: <Welcome />,
    },
    {
      path: "register",
      element: (
        <Layout
          name={UseAuth.getInfo().name}
          type="admin"
          email={UseAuth.getInfo().email}
        ></Layout>
      ),
      children: [
        {
          path: "",
          element: <Welcome />,
        },
        {
          path: "registered-car",
          element: <RegisteredCar />,
        },
        {
          path: "add-center",
          element: <UserList />,
        },
        {
          path: "inspected-car",
          element: <AdminStatisticalRegistered />,
        },
        {
          path: "expired-car",
          element: <AdminStatisticalExpired />,
        },
        {
          path: "statistic-car",
          element: <AdminStatisticalCar />,
        },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },
    {
      path: "center",
      element: (
        <Layout
          name={UseAuth.getInfo().name}
          type="user"
          email={UseAuth.getInfo().email}
        ></Layout>
      ),
      children: [
        {
          path: "",
          element: <Welcome />,
        },
        { path: "add-certi", element: <AddCerti /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "inspected-car", element: <StatisticalTime /> },
        { path: "expired-car", element: <StatisticalExpired /> },
        {
          path: "statistic-car",
          element: <CenterStatisticalCar />,
        },
      ],
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ]);

  return routes;
}

export default App;
