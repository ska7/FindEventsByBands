import React, { useState, useEffect } from "react";
import { EventDetails } from "./EventDetails";
import { useFavorites } from "./hooks/useFavorites";

export const FavoriteEvent = (props) => {
  const { match } = props;

  const { favorites } = useFavorites();

  const [event, setEvent] = useState(() =>
    favorites.find((favorite) => match.params.eventID == favorite.id)
  );

  useEffect(() => {
    setEvent(favorites.find((favorite) => match.params.eventID == favorite.id));
  }, [match]);

  return <EventDetails event={event} />;
};
