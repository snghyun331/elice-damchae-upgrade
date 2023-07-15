import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_ARR } from "./routes";

import Header from "../components/global/Header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="mb-20 mx-4 sm:mx-10 md:mx-20 lg:mx-40">
        <Routes>
          {ROUTE_ARR.map((route, index) => {
            return (
              <Route
                path={route.path}
                element={<route.element />}
                key={index}
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
