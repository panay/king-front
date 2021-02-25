import React, {
  ComponentType,
  lazy,
  LazyExoticComponent,
  Suspense,
  useContext,
  useMemo,
} from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "infrastructure/context/AuthContext";
import { SidebarLayout } from "domains";

interface Route {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
  exact: boolean;
}

const routes: Route[] = [
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
  const authenticated = useContext(AuthContext);
  const loading = <div>Loading...</div>;
  const result = useMemo(
    () =>
      routes.map((route: Route, index: number) => (
        <PrivateRoute
          key={index}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      )),
    []
  );
  if (!authenticated) {
    return (
      <Suspense fallback={loading}>
        <Switch>{result}</Switch>
      </Suspense>
    );
  }

  return (
    <SidebarLayout>
      <Suspense fallback={loading}>
        <Switch>
          {result}
        </Switch>
      </Suspense>
    </SidebarLayout>
  );
};
