import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../pages/Roots/Root";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddFood from "../pages/AddFood/AddFood";
import PrivateRoute from "../Provider/PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AvailableFoods from "../pages/AvailableFood/AvailableFoods";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import AllFood from "../pages/AvailableFood/AllFood";
import MyFoods from "../pages/MyFoods/MyFoods";
import MyFoodReq from "../pages/MyFoodReq/MyFoodReq";
import DetailsNotFound from "../pages/ErrorPage/DetailsNotFound";
import DashboardLayout from "../pages/Roots/DashboardLayout";
import About from "../pages/AboutUs/About"
import Profile from "../pages/MyProfile/Profile";
import Dashboard from "../pages/Roots/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/availableFoods",
        Component: AllFood,
        children: [
          {
            index: true,
            Component: AvailableFoods,
          },
          {
            path: ":id",
            element: <FoodDetails></FoodDetails>,
          },
        ],
      },
      {
        path: "/detailsNotFound",
        Component: DetailsNotFound,
      },
      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboardLayout",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>
      },
      {
        path: "/dashboardLayout/myFood",
        element: <MyFoods></MyFoods>,
      },
      {
        path: "/dashboardLayout/myFoodReq",
        element: <MyFoodReq></MyFoodReq>,
      },
    ],
  },
]);
