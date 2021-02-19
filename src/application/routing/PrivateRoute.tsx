import React, { useContext } from "react";
import { Route, RouteProps } from "react-router";
import { Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext";

type Props = RouteProps & {
  component: React.ComponentType<any>;
};

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const authenticated = useContext(AuthContext);
  const isLoginPage = rest.path === "/login";

  return (
    <Route
      {...rest}
      render={(props) =>
        (authenticated && !isLoginPage) || (!authenticated && isLoginPage) ? (
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
