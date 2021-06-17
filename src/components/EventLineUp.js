import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  createStyles,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import TableRow from "@material-ui/core/TableRow";
import { Collapse } from "@material-ui/core";
import { theme } from "./Theme";

const useStyles = (isStandAlone) => {
  return makeStyles((theme) =>
    createStyles(
      isStandAlone
        ? // Stand Alone Styles
          {
            unfolded: {
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "auto",
              padding: "0",
              margin: "0",
              width: "100%",
            },
            iconWrapper: {
              width: "100%",
              display: "flex",
              justifyContent: "center",
              position: "sticky",
              top: "0",
            },
            artist: {
              fontSize: "100%",
              // width: "auto",
              color: "white",
              transition: "all 0.3s ease",
              borderBottom: "none",
              textAlign: "center",
              // border: "1px solid red",
              [theme.breakpoints.down("xs")]: {},
            },
            singleArtist: {
              width: "100%",
              display: "flex",
              justifyContent: "center",
            },
            table: {
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
            tableBody: {
              width: "100%",
              overflowY: "auto",
              height: "380px",
              [theme.breakpoints.down("sm")]: {
                height: "auto",
                width: "100%",
              },
              [theme.breakpoints.up("md")]: {
                "&::-webkit-scrollbar": {
                  "-webkitAppearance": "none",
                },
                "&::-webkit-scrollbar:vertical": {
                  width: "4px",
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "4px",
                  backgroundColor: "grey",
                },
              },
            },
            tableRow: {
              width: "100%",
            },
            link: {
              color: "white",
              transition: "all 0.3s ease",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              "&:hover": {
                borderBottom: "1px solid white",
              },
            },
            icon: {
              width: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              "&:hover": {},
            },
            lineupLabel: {
              fontWeight: "900",
              // marginTop: "40px",
              color: "white",
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
              marginTop: "20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "50px 30px",
            },
            btnCancelled: {
              pointerEvents: "none",
              background: "#840809",
              color: "white",
            },
            btnPurchase: {
              transition: "all 0.8s ease",
              color: "black",
              width: "130px",
              height: "50px",
              color: theme.palette.secondary.main,
              border: `1px solid ${theme.palette.secondary.main}`,
              "&:hover": {
                background: theme.palette.secondary.main,
                color: "black",
              },
            },
          }
        : // Item Of List Styles

          {
            unfolded: {
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "auto",
              padding: "0",
              margin: "0",
              width: "100%",
            },
            iconWrapper: {
              width: "100%",
              display: "flex",
              justifyContent: "center",
              position: "sticky",
              top: "0",
            },
            singleArtist: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            },
            artist: {
              fontSize: "13px",
              color: "white",
              transition: "all 0.3s ease",
              borderBottom: "none",
              textAlign: "center",
            },
            table: {
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
            tableBody: {
              width: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            },
            tableRow: {
              width: "100%",
              // padding: "0px 20px",
            },
            link: {
              color: "white",
              transition: "all 0.3s ease",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              "&:hover": {
                borderBottom: "1px solid white",
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
              color: "white",
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
              padding: "50px 30px",
            },
            btnCancelled: {
              pointerEvents: "none",
              background: "#840809",
              color: "white",
            },
            btnPurchase: {
              transition: "all 0.8s ease",
              color: "black",
              width: "130px",
              height: "50px",
              color: theme.palette.secondary.main,
              border: `1px solid ${theme.palette.secondary.main}`,
              "&:hover": {
                background: theme.palette.secondary.main,
                color: "black",
              },
            },
          }
    )
  );
};

const createTableRow = (artists, classes, artistsPerRow) => {
  const chunks = [];

  if (artists.length >= artistsPerRow) {
    for (let i = 0; i < artists.length; i += artistsPerRow) {
      const chunk = artists.slice(i, i + artistsPerRow);
      chunks.push(
        <TableRow className={classes.tableRow}>
          {chunk.map((artist) => (
            <TableCell align="center" className={classes.artist}>
              <Link
                to={`/band/${artist.name}?bandID=${artist.id}`}
                className={classes.link}
              >
                {artist.name}
              </Link>
            </TableCell>
          ))}
        </TableRow>
      );
    }
  } else {
    chunks.push(
      <TableRow className={classes.singleArtist}>
        {artists.map((artist) => (
          <TableCell className={classes.artist}>
            <Link
              to={`/band/${artist.name}?bandID=${artist.id}`}
              className={classes.link}
            >
              {artist.name}
            </Link>
          </TableCell>
        ))}
      </TableRow>
    );
  }

  return chunks;
};

export const EventLineUp = ({ artists, cancelled, collapse, isStandAlone }) => {
  const classes = useStyles(isStandAlone)();
  // If collapse prop is true, isUnfolded

  const xsScreen = useMediaQuery("(max-width: 450px)");
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
          {cancelled ? (
            <Button variant="contained" className={classes.btnCancelled}>
              Cancelled
            </Button>
          ) : (
            <Button
              // variant=""
              color="secondary"
              className={classes.btnPurchase}
            >
              Buy Tickets
            </Button>
          )}
          <Typography className={classes.lineupLabel}>
            {artists.length === 1 ? "SOLO CONCERT" : "WHO'S PERFORMING?"}
          </Typography>
        </Container>
        <TableContainer className={classes.table}>
          <TableBody className={classes.tableBody}>
            {xsScreen
              ? createTableRow(artists, classes, 3)
              : createTableRow(artists, classes, 4)}
          </TableBody>
        </TableContainer>
      </Collapse>
    </Container>
  );
};
