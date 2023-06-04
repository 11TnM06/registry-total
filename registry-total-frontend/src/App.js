import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import {
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

function App() {
  const routes = useRoutes([
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
    { path: "/", element: <Welcome /> },
    {
      path: "/user",
      element: <LoginLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },

    { path: "*", element: <Error404 /> },
  ]);

  return routes;
}

export default App;
