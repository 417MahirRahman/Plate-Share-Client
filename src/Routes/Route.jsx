import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../pages/Roots/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddFood from "../pages/AddFood/AddFood";
import PrivateRoute from "../Provider/PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AvailableFoods from "../pages/AvailableFood/AvailableFoods";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        index: true,
        Component: Home,
      },
      {
        path: "/availableFoods",
        Component: AvailableFoods,
        loader: async () => {
          const res = await fetch("http://localhost:3000/availableFoods")
          const data = res.json()
          return data
        }
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