import React from "react";
import { Route, RouteProps } from "react-router";
import { Redirect } from "react-router-dom";

//todo: тут получение токена
// сделать AuthProvider Context и все манипуляции с доступами до роутов сделать там
const auth = false;

type Props = RouteProps & {
  component: React.ComponentType<any>;
};

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const isLoginPage = rest.path === "/login";
  return (
    <Route
      {...rest}
      render={(props) =>
        (auth && !isLoginPage) || (!auth && isLoginPage) ? (
          <Component {...props} />
        ) : auth && isLoginPage ? (
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
