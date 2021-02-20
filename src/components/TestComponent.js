import React, { useEffect, useState } from "react";
import { SaveButton } from "./SaveButton";

export const TestComponent = ({ match, location }) => {
  const [band, setBand] = useState("");

  const getParams = (location) => {
    const searchParams = new URLSearchParams(location.search);
    setBand(searchParams.get("band") || "");
  };

  useEffect(() => {
    console.log("match", match);
    console.log("location", location);
    getParams(location);
  }, []);

  return (
    <div>
      <h1>{band}</h1>
      <SaveButton event={{ id: 20 }} />
    </div>
  );
};
