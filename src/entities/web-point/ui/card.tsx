import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { Theme } from "shared/types";

import { WebPoint } from "../model";
import { Atom } from "shared/ui";

type Props = {
  action: ({ id }: { id: number }) => void;
  webPoint: WebPoint;
};
export const WebPointCard: React.FC<Props> = ({ webPoint, action }) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Atom.Typography varinat="h3">WebPoint</Atom.Typography>
      <Atom.Typography variant="body1">Url: {webPoint.url}</Atom.Typography>
      <Atom.Button onClick={(e) => action({ id: webPoint.id })}>
        Open
      </Atom.Button>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),

      "&:last-child": { marginBottom: 0 },
    },
  })
);
