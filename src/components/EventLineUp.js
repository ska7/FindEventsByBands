import React, { useState } from "react";

import {
  Button,
  Container,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import TableRow from "@material-ui/core/TableRow";
import { Collapse } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  unfolded: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    padding: "0",
    margin: "0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  iconWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "sticky",
    top: "0",
  },
  artist: {
    fontSize: "13px",
    color: "white",
    transition: "all 0.2s ease",
    borderBottom: "none",
    "&:hover": {
      fontWeight: "800",
    },
  },
  icon: {
    width: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&:hover": {},
  },
  lineupTitle: {
    fontWeight: "900",
  },
  lineUp: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  arrowSeeLess: {
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
  },
  labels: {
    display: "flex",
    flexDirectios: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "50px 15px",
  },
  btnCancelled: {
    pointerEvents: "none",
    background: "#840809",
    color: "white",
  },
}));

const createTableRow = (artists, classes) => {
  const chunks = [];

  for (let i = 5; i < artists.length; i += 5) {
    const chunk = artists.slice(i, i + 5);
    chunks.push(
      <TableRow>
        {chunk.map((artist) => (
          <TableCell className={classes.artist}>{artist}</TableCell>
        ))}
      </TableRow>
    );
  }

  return chunks;
};

export const EventLineUp = ({ artists, cancelled, collapse }) => {
  const classes = useStyles();
  // If collapse prop is true, isUnfolded
  const [isUnfolded, setUnfolded] = useState(!collapse);
  return (
    <Container className={classes.unfolded}>
      {collapse && (
        <Container className={classes.iconWrapper}>
          <IconButton
            color="secondary"
            onClick={() => setUnfolded(!isUnfolded)}
            className={classes.icon}
          >
            {isUnfolded ? (
              <ExpandLessIcon className={classes.arrowSeeLess} />
            ) : (
              <ExpandMoreIcon />
            )}
          </IconButton>
        </Container>
      )}
      <Collapse in={isUnfolded} timeout="auto">
        <Container className={classes.labels}>
          <Typography className={classes.lineupTitle}>LINEUP</Typography>
          {cancelled ? (
            <Button variant="contained" className={classes.btnCancelled}>
              Cancelled
            </Button>
          ) : (
            <Button variant="outlined" color="secondary">
              Buy Tickets
            </Button>
          )}
        </Container>
        <TableContainer>
          <TableBody>{createTableRow(artists, classes)}</TableBody>
        </TableContainer>
      </Collapse>
    </Container>
  );
};
