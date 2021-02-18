import React from "react";
import { Route, RouteProps } from "react-router";
import { Redirect } from "react-router-dom";
import { useStore } from "effector-react";
import { $authenticated } from "infrastructure/models/auth/login";

type Props = RouteProps & {
  component: React.ComponentType<any>;
};

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const authenticated = useStore($authenticated);
  const isLoginPage = rest.path === "/login";
  return (
    <Route
      {...rest}
      render={(props) =>
        (authenticated && !isLoginPage) ||
        (!authenticated && isLoginPage) ? (
          <Component {...props} />
        ) : authenticated && isLoginPage ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
