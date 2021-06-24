import React, { useState, useEffect } from "react";
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
import { IconButton, Link as MaterialLink, Collapse } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import TableRow from "@material-ui/core/TableRow";
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
              height: "80%",
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
              color: "white",
              transition: "all 0.3s ease",
              borderBottom: "none",
              textAlign: "center",
              // border: "1px solid red",
              width: "15%",
              [theme.breakpoints.down("xs")]: {},
              [theme.breakpoints.up("xs")]: {
                // fontSize: "100%",
                width: "19%",
              },
            },
            singleArtist: {
              width: "100%",
              // display: "flex",
              justifyContent: "center",
            },
            table: {
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              // border: "1px solid green",
              height: "auto",
              margin: 0,
            },
            tableBody: {
              position: "relative",
              width: "100%",
              overflowX: "hidden",
              [theme.breakpoints.down("sm")]: {
                height: "100%",
                width: "100%",
              },
              [theme.breakpoints.up("sm")]: {
                overflowY: "auto",
                height: "100%",
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
              [theme.breakpoints.up("md")]: {
                // overflowY: "auto",
                height: "auto",
                padding: "0px 30px",
              },
            },
            tableRow: {
              width: "100%",
              [theme.breakpoints.up("md")]: {},
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
            removeDecoration: {
              border: "none",
              textDecoration: "none !important",
              "&:hover": {
                border: "none",
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
              height: "35px",
              width: "35px",
              padding: "5px",
              background: "rgba(255,255,255,0.8)",
            },
            arrowSeeLessMobileIcon: {
              width: "100%",
              display: "flex",
              justifyContent: "center",
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
              fontSize: "100%",
              color: "white",
              transition: "all 0.3s ease",
              borderBottom: "none",
              textAlign: "center",
              [theme.breakpoints.down("xs")]: {
                fontSize: "13px",
                width: "33%",
              },
              [theme.breakpoints.up("xs")]: {},
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
              [theme.breakpoints.down("xs")]: {
                display: "flex",
                justifyContent: "center",
              },
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
            removeDecoration: {
              border: "none",
              textDecoration: "none !important",
              "&:hover": {
                border: "none",
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
              height: "35px",
              width: "35px",
              padding: "5px",
              background: "rgba(255,255,255,0.1)",
            },
            arrowSeeMore: {
              borderRadius: "50%",
              height: "35px",
              width: "35px",
              padding: "5px",
            },
            labels: {
              display: "flex",
              flexDirectios: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "50px 30px",
              [theme.breakpoints.down("xs")]: {
                padding: "50px 10px",
              },
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
            arrowSeeLessMobileIcon: {
              display: "none",
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

export const EventLineUp = ({
  artists,
  cancelled,
  collapse,
  isStandAlone,
  eventURL,
}) => {
  // Based on the lineup height, we decide whether or not to show the scroll button on the bottom
  const [lineUpHeight, setLineUpHeight] = useState(0);

  const xsScreen = useMediaQuery("(max-width: 450px)");
  const lgScreen = useMediaQuery("(min-width: 1000px)");
  const mdScreen = useMediaQuery("(min-width: 451px) and (max-width: 999px)");

  // If collapse prop is true, isUnfolded
  const [isUnfolded, setUnfolded] = useState(!collapse);

  useEffect(() => {
    const height = document.getElementById("event-lineup").offsetHeight;
    // console.log(height);
    setLineUpHeight(height);
  }, [lineUpHeight]);

  const classes = useStyles(isStandAlone)();
  return (
    <Container
      className={classes.unfolded}
      id="event-lineup"
      onTouchStart={() => setUnfolded(!collapse)}
    >
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
              <ExpandMoreIcon className={classes.arrowSeeMore} />
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
            <MaterialLink
              href={eventURL}
              // onClick={(e) => e.preventDefault()}
              rel="noopener"
              target="_blank"
              className={`${classes.link} ${classes.removeDecoration}`}
            >
              <Button
                // variant=""
                color="secondary"
                className={classes.btnPurchase}
              >
                Buy Tickets
              </Button>
            </MaterialLink>
          )}
          <Typography className={classes.lineupLabel}>
            {artists.length === 1 ? "SOLO CONCERT" : "WHO'S PERFORMING?"}
          </Typography>
        </Container>
        <TableContainer className={classes.table}>
          <TableBody className={classes.tableBody}>
            {xsScreen && createTableRow(artists, classes, 3)}
            {mdScreen && createTableRow(artists, classes, 4)}
            {lgScreen && createTableRow(artists, classes, 5)}
            {xsScreen & (lineUpHeight > 1000) ||
              (xsScreen & (lineUpHeight > 500) ? (
                <IconButton className={classes.arrowSeeLessMobileIcon}>
                  <MaterialLink href="#event-general-information">
                    <ExpandLessIcon className={classes.arrowSeeLess} />
                  </MaterialLink>
                </IconButton>
              ) : null)}
          </TableBody>
        </TableContainer>
      </Collapse>
    </Container>
  );
};
