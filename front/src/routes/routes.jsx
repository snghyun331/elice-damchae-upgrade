import Home from "../components/home/home";
import Register from "../components/register/Register";
import My from "../components/my/My";
import Story from "../components/Story/Story";

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
  },
  STORY: {
    path: "/story",
    link: "/story",
    element: Story,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
