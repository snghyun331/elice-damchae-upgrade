import Home from "../components/home/home";
import Register from "../components/register/Register";
import My from "../components/my/My";

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
  MY: {
    path: "/my",
    link: "/my",
    element: My,
  }
};

export const ROUTE_ARR = Object.values(ROUTE);
