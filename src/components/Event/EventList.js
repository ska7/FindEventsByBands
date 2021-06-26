import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Container, ListItem, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";

import { EventsFilter } from "./EventsFilter";
import { Event } from "./Event";

const useStyles = (eventsListHeight) => {
  return makeStyles((theme) => ({
    eventsListContainer: {
      height: "100%",
      width: "100%",
      color: "white",
      flexDirection: "column",
      padding: 0,
      position: "relative",
      [theme.breakpoints.down("xs")]: {},
    },
    header: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      textAlign: "center",
      fontSize: "30px",
      height: "70px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "25px",
        fontWeight: "900",
        marginTop: "100px",
      },
      [theme.breakpoints.up("sm")]: {
        background: "rgba(0,0,0,0.8)",
        boxShadow: "0px 0px 25px 10px black",
      },
    },
    subheader: {
      background: "#333333",
      textAlign: "center",
      padding: "10px 0px",
    },
    filterContainer: {
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
        height: `${eventsListHeight - 290}px`,
      },
      [theme.breakpoints.up("sm")]: {
        height: "70%",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "50% 30%",
        padding: 0,
        ...theme.visibleScrollbar,
      },
      [theme.breakpoints.up("md")]: {
        height: "80%",
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
};

export const EventList = (props) => {
  const { events, match, location, displayName } = props;
  const [filterString, setFilterString] = useState("");
  const [eventsNumber, setEventsNumber] = useState("");
  const [eventsListHeight, setEventsListHeight] = useState(0);

  useEffect(() => {
    if (events.length) {
      const height = document.getElementById("list-of-events").offsetHeight;
      setEventsListHeight(height);
    }
  }, []);

  const classes = useStyles(eventsListHeight)();
  return (
    <>
      <Typography className={classes.header}>{displayName}</Typography>
      <List dense className={classes.eventsListContainer} id="list-of-events">
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
                        <Event
                          event={event}
                          collapse={true}
                          standAlone={false}
                        />
                      );
                    })
                : events.map((event) => (
                    <Event event={event} collapse={true} standAlone={false} />
                  ))}
            </Container>
          </>
        ) : (
          <ListItem
            id="no-events"
            style={{
              // textAlign: "center !important",
              display: "flex",
              justifyContent: "center",
              marginTop: "50%",
              fontSize: "25px",
            }}
          >
            This artist has no upcoming events!
          </ListItem>
        )}
      </List>
    </>
  );
};
