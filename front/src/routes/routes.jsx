import Home from "../components/home/home";
import Register from "../components/register/Register";

export const ROUTE = {
  HOME: {
    path: "/",
    link: "/",
    element: Home,
  },
  REGISTER: {
    path: "/register",
    link: "/register",
    element: Register,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
