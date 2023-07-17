import { Route, Routes } from "react-router-dom";
import { ROUTE_ARR } from "./Routes";

const Router = () => {
  return (
    <Routes>
      {ROUTE_ARR.map((route, index) => {
        return (
          <Route path={route.path} element={<route.element />} key={index} />
        );
      })}
    </Routes>
  );
};

export default Router;
