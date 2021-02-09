import * as React from "react";
import { Route, RouteProps } from "react-router";
import { Redirect } from "react-router-dom";

const auth = false;

type Props<P> = RouteProps &
  P & {
    component: React.ComponentType<P>;
  };

const PrivateRoute = ({ component: Component, ...rest }: Props<any>) => {
  const isLoginPage = rest.path === "/login";
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth && isLoginPage ? (
          <Component {...props} />
        ) : auth && isLoginPage ? (
          <Redirect to={{ pathname: "/" }} />
        ) : auth ? (
          <Component {...props} />
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
