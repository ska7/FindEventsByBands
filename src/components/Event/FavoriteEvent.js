import { Event } from "components/Event/Event";
import React, { useState, useEffect } from "react";
import { useFavorites } from "../hooks/useFavorites";

export const FavoriteEvent = (props) => {
  const { match } = props;

  const { favorites } = useFavorites();

  const [event, setEvent] = useState(() =>
    favorites.find((favorite) => match.params.eventID == favorite.id)
  );

  useEffect(() => {
    setEvent(favorites.find((favorite) => match.params.eventID == favorite.id));
  }, [match]);

  return (
    <Event
      event={event}
      collapse={false}
      hoverFocus={false}
      isStandAlone={true}
    />
  );
};
