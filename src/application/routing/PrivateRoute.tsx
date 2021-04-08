import React, {ReactNode, Suspense, useContext} from "react";
import { Route, RouteProps } from "react-router";
import { Redirect } from "react-router-dom";
import AuthContext from "infrastructure/context/AuthContext";

type Props = RouteProps & {
  component: React.ComponentType<any>;
  fallback?: NonNullable<ReactNode>|null;
};

const PrivateRoute = ({ component: Component, fallback, ...rest }: Props) => {
  const authenticated = useContext(AuthContext);
  const isLoginPage = rest.path === "/login";

  return (
    <Suspense fallback={fallback ? fallback : <></>}>
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
    </Suspense>
  );
};

export default PrivateRoute;
