import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { reflect } from "@effector/reflect";

import { model } from "entities/status";

import { paths } from "shared/config";

import LogInPage from "./login";
import HomePage from "./home";

const IS_AUTH_ROUTES = [
  { exact: true, path: paths.home(), component: HomePage },
];

const IS_NOT_AUTH_ROUTES = [
  { exact: true, path: paths.login(), component: LogInPage },
];

type Props = { isAuth: boolean; status: model.Status };
const View: React.FC<Props> = ({ status, isAuth }) => {
  const renderRoutes = isAuth ? IS_AUTH_ROUTES : IS_NOT_AUTH_ROUTES;

  const rederictLink = isAuth ? "/home" : "/login";

  if (!status) return null;

  return (
    <Switch>
      {renderRoutes.map((route) => {
        return <Route key={route.path} {...route} />;
      })}
      <Redirect to={rederictLink} />
    </Switch>
  );
};

export const Routing = reflect({
  view: View,
  bind: {
    status: model.stores.$status,
    isAuth: model.stores.$status.map((v) => v === "authorized"),
  },
});
