import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const NotFoundPage = lazy(() => import("../pages/NotFound"));
const LoginPage = lazy(() => import("../pages/Login"));
const HomePage = lazy(() => import("../pages/Home"));
const UsersPage = lazy(() => import("../pages/Users"));

export const RouterConfig = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <PrivateRoute exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/users" component={UsersPage} />
          <PrivateRoute path="*" component={NotFoundPage} />
        </Switch>
      </Suspense>
    </>
  );
};
