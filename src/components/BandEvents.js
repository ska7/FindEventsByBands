import React, { useEffect, useState } from "react";
import axios from "axios";

export const BandEvents = ({ bandID }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    bandID &&
      axios
        .get(
          `https://api.songkick.com/api/3.0/artists/${bandID}/calendar.json?apikey=K0cI0s0IC8ii7i2w`
        )
        .then((res) => console.log(res));
  }, [bandID]);

  return <div>{bandID}</div>;
};
