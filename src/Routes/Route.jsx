import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../pages/Roots/Root";
import Login from "../pages/Login/Login";

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
        path:"/login",
        Component: Login,
      },
      
    ] 
  },
]);