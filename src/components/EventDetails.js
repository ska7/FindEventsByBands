import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      ...theme.eventDetailsCard,
    },
  })
);

const getAccessToken = (updateToken) => {
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic MzA0OTdkOTRiYjMwNGYyNjhhMzY4ZDdjMWRiODFkMzk6ZDBiYjYzZmVkMTA1NDQ4NTlkYTdiMmVlMjMwMjk2YTI=",
    },
    data: "grant_type=client_credentials",
  }).then(({ data }) => updateToken(data.access_token));
};

export const EventDetails = () => {
  const classes = useStyles();

  const [token, setToken] = useState("");

  useEffect(() => {
    getAccessToken(setToken);
  }, []);
  return (
    <div className="event-details-container">
      <Card className={classes.root}>
        <h1>HEY</h1>
      </Card>
    </div>
  );
};
