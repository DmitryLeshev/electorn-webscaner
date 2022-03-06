import React from "react";

import { createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

import { Theme } from "shared/types";
import { reflect } from "@effector/reflect";

import { model } from "entities/status";

type Props = {
  children: React.ReactElement;
  isAuth: boolean;
};

const View: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <main
        className={clsx(classes.main, {
          [classes.mainShift]: false,
        })}
      >
        {children}
      </main>
    </>
  );
};

export const Layout = reflect({
  view: View,
  bind: { isAuth: true },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      overflow: "auto",
      width: `calc(100% - ${theme.drawer.closeWidth}px)`,
      marginLeft: theme.drawer.closeWidth,
      transition: theme.drawer.transition,
    },
    mainShift: {
      width: `calc(100% - ${theme.drawer.openWidth}px)`,
      marginLeft: theme.drawer.openWidth,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginLeft: 0,
      },
    },
  })
);
