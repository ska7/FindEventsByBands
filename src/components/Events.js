import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";

import { EventsFilter } from "./EventsFilter";
import { Event } from "./Event";

const useStyles = makeStyles((theme) => ({
  eventsListContainer: {
    height: "100%",
    width: "100%",
    color: "white",
    flexDirection: "column",
    padding: 0,
    position: "relative",
    [theme.breakpoints.down("xs")]: {},
  },
  subheader: {
    background: "#333333",
    textAlign: "center",
    padding: "10px 0px",
  },
  container: {},
  filterContainer: {
    // position: "fixed",
    width: "100%",
    height: "70px",
  },
  checkbox: {
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.7)",
      borderRadius: "50%",
    },
  },
  link: {
    ...theme.links,
  },
  listItem: {
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "auto",
    transition: "all 0.5s ease",
    borderTop: "1px solid rgba(255, 255, 255, 0.0)",
    borderBottom: "1px solid rgba(255, 255, 255, 0)",
    "&:hover": {
      backgroundColor: "rgba(0,0,0, 0.2)",
      borderTop: "1px solid rgba(255, 255, 255, 0.3)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    },
  },
  filterContainer: {
    position: "sticky",
    top: "5%",
    zIndex: "10",
  },
  eventsList: {
    overflowY: "auto",
    [theme.breakpoints.down("xs")]: {
      height: "65%",
    },
    [theme.breakpoints.up("sm")]: {
      height: "70%",
      width: "100%",

      backgroundSize: "cover",
      backgroundPosition: "50% 30%",
      padding: 0,
    },
    [theme.breakpoints.up("lg")]: {
      height: "70%",
      width: "100%",
      backgroundSize: "cover",
      backgroundPosition: "50% 30%",
      padding: 0,
    },
  },
}));

export const Events = (props) => {
  const { events, match, location } = props;
  const classes = useStyles();
  const [filterString, setFilterString] = useState("");
  const [eventsNumber, setEventsNumber] = useState("");

  return (
    <List dense className={classes.eventsListContainer}>
      {events.length ? (
        <>
          <Container className={classes.filterContainer}>
            <EventsFilter setFilterStringFunc={setFilterString} />
          </Container>
          <Container className={classes.eventsList}>
            {filterString
              ? events
                  .filter((event) =>
                    event.location.city
                      .toLowerCase()
                      .includes(filterString.toLocaleLowerCase())
                  )
                  .map((event) => {
                    return (
                      <Event event={event} collapse={true} standAlone={false} />
                    );
                  })
              : events.map((event) => (
                  <Event event={event} collapse={true} standAlone={false} />
                ))}
          </Container>
        </>
      ) : (
        <li
          id="no-events"
          style={{
            marginTop: "50%",
            fontSize: "25px",
          }}
        >
          This artist has no upcoming events!
        </li>
      )}
    </List>
  );
};
