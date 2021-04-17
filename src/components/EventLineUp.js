import React, { useState } from "react";

import { Container, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
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
    flexDirection: "row",
  },
}));

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
        <List className={classes.lineUp}>
          {artists.map((artist) => (
            <ListItem className={classes.artist}>{artist.displayName}</ListItem>
          ))}
        </List>
      </Collapse>
    </Container>
  );
};
