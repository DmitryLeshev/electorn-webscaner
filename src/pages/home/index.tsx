import React from "react";

import { RouteChildrenProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGate } from "effector-react";

import { reflect } from "@effector/reflect";
import { makeStyles, createStyles } from "@material-ui/core";

import { UI as UIWebPoint, model as modelWebPoint } from "entities/web-point";

import { Atom, Molec } from "shared/ui";
import { Theme } from "shared/types";

type Props = RouteChildrenProps<{}> & {
  listWebPoints: modelWebPoint.WebPoint[];
  loadingListWebPoints: boolean;
  webPoint: modelWebPoint.WebPoint | null;
  selectWebPoint: ({ id }: { id: number }) => void;
};

const View = ({
  match,
  listWebPoints,
  selectWebPoint,
  webPoint,
  loadingListWebPoints,
}: Props) => {
  const { t } = useTranslation();
  useGate(modelWebPoint.gates.WebPointGate);

  const classes = useStyles();
  return (
    <Molec.Page className={classes.page} title={t("pages:home.title")}>
      <Atom.Typography className={classes.title} variant="h3" align="center">
        HomePage
      </Atom.Typography>
      {loadingListWebPoints ? (
        <div className={classes.loader}>
          <Atom.CircularProgress />
        </div>
      ) : (
        listWebPoints.map((point) => (
          <UIWebPoint.WebPointCard
            key={point.id}
            webPoint={point}
            action={selectWebPoint}
          />
        ))
      )}
    </Molec.Page>
  );
};

const HomePage = reflect({
  view: View,
  bind: {
    listWebPoints: modelWebPoint.stores.$listWebPoints,
    webPoint: modelWebPoint.stores.$webPoint,
    selectWebPoint: modelWebPoint.actions.selectWebPoint,
    loadingListWebPoints: modelWebPoint.stores.$loadingListWebPoints,
  },
  hooks: {
    mounted: () => console.log("[Home page] mounted"),
    unmounted: () => console.log("[Home page] unmounted"),
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      position: "relative",
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      padding: theme.spacing(3),
    },
    title: { marginBottom: theme.spacing(3) },
    loader: {
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

export default HomePage;
