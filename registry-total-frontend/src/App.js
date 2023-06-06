import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import {
  ChangePassword,
  Error404,
  ForgotPassword,
  Login,
  Product,
  ResetPassword,
  Welcome,
} from "./pages";
import { Layout } from "./layouts/Layout";
import { LoginLayout } from "./layouts/LoginLayout";
import RegisteredCar from "./pages/admin/RegisteredCar";
import { UserList } from "./pages/admin/UserList";
import AddCerti from "./pages/center/AddCerti";
import { UseAuth } from "./utils";

function App() {
  const routes = useRoutes([
    // {
    //   element: <UseAuth.Auth element={<Layout />} roles={["admin", "user"]} />,
    //   children: [
    //     { path: "/", element: <Welcome /> },
    //     { path: "/change-password", element: <ChangePassword /> },
    //     { path: "/logout", element: <Logout /> },
    //   ],
    // },
    // {
    //   path: "register",
    //   element: <UseAuth.Auth element={<Layout />} roles={["admin"]} />,
    //   children: [
    //     {
    //       path: "registered-car",
    //       element: <RegisteredCar />,
    //     },
    //     {
    //       path: "add-center",
    //       element: <UserList />,
    //     },
    //     {
    //       path: "inspected-car",
    //       element: <h1>inspected-car</h1>,
    //     },
    //     {
    //       path: "expired-car",
    //       element: <h1>add center</h1>,
    //     },
    //   ],
    // },
    // {
    //   path: "center",
    //   element: <UseAuth.Auth element={<Layout />} roles={["user"]} />,
    //   children: [
    //     { path: "add-certi", element: <AddCerti /> },
    //     { path: "inspected-car", element: <h1>inspected-car</h1> },
    //     { path: "expired-car", element: <h1>add center</h1> },
    //   ],
    // },
    // {
    //   path: "*",
    //   element: (
    //     <UseAuth.Auth element={<Error404 />} roles={["admin", "user"]} />
    //   ),
    // },
    { path: "/", element: <Welcome /> },
    { path: "/change-password", element: <ChangePassword /> },
    {
      path: "/user",
      element: <LoginLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
    {
      path: "register",
      element: (
        <Layout
          companyName="REGISTER"
          type="register"
          email="register@gmail.com"
        ></Layout>
      ),
      children: [
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
          element: <h1>inspected-car</h1>,
        },
        {
          path: "expired-car",
          element: <h1>add center</h1>,
        },
      ],
    },
    {
      path: "center",
      element: (
        <Layout
          companyName="CENTER 1"
          type="center"
          email="center@gmail.com"
        ></Layout>
      ),
      children: [
        { path: "add-certi", element: <AddCerti /> },
        { path: "inspected-car", element: <h1>inspected-car</h1> },
        { path: "expired-car", element: <h1>add center</h1> },
      ],
    },
  ]);

  return routes;
}

export default App;
