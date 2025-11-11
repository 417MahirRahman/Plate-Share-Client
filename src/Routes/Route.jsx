import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../pages/Roots/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddFood from "../pages/AddFood/AddFood";
import PrivateRoute from "../Provider/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
      {
        index: true,
        Component: Home,
      },
      {
        path: "/availableFood",

      },
      {
        path: "/addFood",
        element: <AddFood></AddFood>
      },
      {

      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      }
    ] 
  },
]);