import React from "react";
import { RouteChildrenProps } from "react-router-dom";

import { createStyles, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { reflect } from "@effector/reflect";

import { model, UI } from "entities/viewer";
import { UI as UILogo } from "features/logotype";

import { Theme } from "shared/types";
import { Molec } from "shared/ui";
import { useInput } from "shared/hooks";
import { validations } from "shared/utils";

type Props = RouteChildrenProps<{}> & {
  isLoading: boolean;
  logIn: (params: model.LoginParams) => void;
};

const View: React.FC<Props> = ({ logIn, isLoading }) => {
  const { t } = useTranslation();

  const login = useInput("", { validations: validations.login });
  const password = useInput("", { validations: validations.password });

  const classes = useStyles();
  return (
    <Molec.Page className={classes.page} title={t("pages:login.title")}>
      <UILogo.Logotype className={classes.logotype} />
      <form className={classes.form} autoComplete="on">
        <UI.InputLogin {...login} />
        <UI.InputPassword {...password} />
        <UI.ButtonLogin
          isDisabled={isLoading || !!login.error || !!password.error}
          isLoading={isLoading}
          action={() => {
            logIn({ login: login.value, password: password.value });
          }}
        />
      </form>
    </Molec.Page>
  );
};

const LoginPage = reflect({
  view: View,
  bind: {
    isLoading: model.stores.$logInPending,
    logIn: model.actions.logIn,
  },
  hooks: {
    mounted: () => console.log("[Page login] mounted"),
    unmounted: () => console.log("[Page login] unmounted"),
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      position: "relative",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    form: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(3),
      minWidth: 320,
    },
    logotype: {
      position: "absolute",
      width: 100,
      marginBottom: theme.spacing(40),
    },
  })
);

export default LoginPage;
