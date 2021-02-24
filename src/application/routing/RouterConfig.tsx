import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const routes = [
  {
    path: "/",
    component: lazy(() => import("../pages/Home")),
    exact: true,
  },
  {
    path: "/login",
    component: lazy(() => import("../pages/Login")),
    exact: true,
  },
  {
    path: "/users",
    component: lazy(() => import("../pages/Users")),
    exact: true,
  },
  {
    path: "/settings",
    component: lazy(() => import("../pages/Settings")),
    exact: true,
  },
  {
    path: "*",
    component: lazy(() => import("../pages/NotFound")),
    exact: false,
  },
];

export const RouterConfig = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map((route, index) => (
            <PrivateRoute
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </Suspense>
    </>
  );
};
