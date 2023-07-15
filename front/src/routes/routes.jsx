import Home from "../components/home/home";
import My from "../components/my/My";
import Story from "../components/Story/Story";
import LoginForm from "../components/User/Loginform";
import RegisterForm from "../components/User/Registerform";

export const ROUTE = {
  HOME: {
    path: "/",
    link: "/",
    element: Home,
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
  LOGIN: {
    path: "/login",
    link: "/login",
    element: LoginForm,
  },
  REGISTER: {
    path: "/register",
    link: "/register",
    element: RegisterForm,
  },
};

export const ROUTE_ARR = Object.values(ROUTE);
