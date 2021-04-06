import React, {
  ComponentType,
  lazy,
  LazyExoticComponent, ReactNode,
  Suspense,
  useContext,
  useMemo,
} from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AuthContext, {
  CheckAuthContext,
} from "infrastructure/context/AuthContext";
import { SidebarLayout } from "domains";
import {LoginLoader, DashboardLoader, UsersLoader} from "ui";
import { ReactComponent as IcLoader } from "infrastructure/assets/images/svgs/ic-loader.svg";

interface Route {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
  exact: boolean;
  fallback?: NonNullable<ReactNode>|null;
}

const routes: Route[] = [
  {
    path: "/",
    component: lazy(() => import("../pages/Home")),
    exact: true,
    fallback: DashboardLoader()
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
    fallback: UsersLoader()
  },
  {
    path: "/settings",
    component: lazy(() => import("../pages/Settings")),
    exact: true,
  },
  {
    path: "/location",
    component: lazy(() => import("../pages/Location")),
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
  const isAuthCheck = useContext(CheckAuthContext);
  const emptyResultLoader = (
    <div className="bg-input-grey flex flex-col items-center justify-center p-3 h-full">
      <IcLoader className="text-primary" />
    </div>
  );
  const loginLoader = (
    <div className="bg-input-grey flex flex-col items-center justify-center p-3 h-full">
      <LoginLoader />
    </div>
  );
  const result = useMemo(
    () =>
      routes.map((route: Route, index: number) => (
        <PrivateRoute
          key={index}
          exact={route.exact}
          path={route.path}
          component={route.component}
          fallback={route.fallback}
        />
      )),
    []
  );

  if (!authenticated) {
    return (
      <Suspense fallback={loginLoader}>
        <Switch>{result}</Switch>
      </Suspense>
    );
  }

  if (!isAuthCheck) {
    return emptyResultLoader;
  }

  return (
    <SidebarLayout>
      <Switch>{result}</Switch>
    </SidebarLayout>
  );
};
