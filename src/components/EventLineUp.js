import React, { useState } from "react";

import {
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
    display: "flex",
    flexDirection: "column",
    height: "auto",
    padding: "0",
    margin: "0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  artist: {
    fontSize: "13px",
    color: "white",
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
}));

const createTableRow = (artists, classes) => {
  // let numberOfRows = (artists.length / 5);
  const chunks = [];

  for (let i = 5; i < artists.length; i += 5) {
    const chunk = artists.slice(i, i + 5);
    chunks.push(
      <TableRow>
        {chunk.map((artist) => (
          <TableCell className={classes.artist}>{artist.displayName}</TableCell>
        ))}
      </TableRow>
    );
  }

  return chunks;
};

export const EventLineUp = ({ artists }) => {
  const classes = useStyles();

  const [isUnfolded, setUnfolded] = useState(false);
  return (
    <Container className={classes.unfolded}>
      <Container
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <IconButton
          color="secondary"
          onClick={() => setUnfolded(!isUnfolded)}
          className={classes.icon}
        >
          {isUnfolded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Container>
      <Collapse in={isUnfolded} timeout="auto">
        <Typography className={classes.lineupTitle}>LINEUP</Typography>
        <TableContainer>
          <Table className={classes.table} size="small"></Table>
          <TableBody>{createTableRow(artists, classes)}</TableBody>
        </TableContainer>
      </Collapse>
    </Container>
  );
};
