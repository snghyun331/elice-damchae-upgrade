import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_ARR } from "./routes";

import Header from "../components/global/Header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {ROUTE_ARR.map((route, index) => {
          return (
            <Route path={route.path} element={<route.element />} key={index} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;