import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../context/FavoritesContext";

export const BandEvents = () => {
  const [events, setEvents] = useState([]);

  const { chosenBandID } = useContext(GlobalContext);

  useEffect(() => {
    chosenBandID &&
      axios
        .get(
          `https://api.songkick.com/api/3.0/artists/${chosenBandID}/calendar.json?apikey=K0cI0s0IC8ii7i2w`
        )
        .then((res) => console.log(res));
  }, [chosenBandID]);

  return <div>{chosenBandID}</div>;
};
