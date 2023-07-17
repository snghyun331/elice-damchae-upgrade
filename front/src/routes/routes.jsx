import Home from "../components/Home/Home";
import MyPage from "../components/MyPage/MyPage";
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
    path: "/mypage",
    link: "/mypage",
    element: MyPage,
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
