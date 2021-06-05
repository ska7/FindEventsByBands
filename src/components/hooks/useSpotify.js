import axios from "axios";
import qs from "qs";
import { throttle } from "lodash";
import { useRef, useState, useEffect } from "react";

const tokenOption = {
  method: "post",
  url: "https://accounts.spotify.com/api/token",
  headers: {
    accept: "application/json",
    "content-type": "application/x-www-form-urlencoded",
    authorization:
      "Basic MzA0OTdkOTRiYjMwNGYyNjhhMzY4ZDdjMWRiODFkMzk6ZDBiYjYzZmVkMTA1NDQ4NTlkYTdiMmVlMjMwMjk2YTI=",
  },
  data: qs.stringify({ grant_type: "client_credentials" }),
};

// https://community.spotify.com/t5/Spotify-for-Developers/Token-API-CORS-error/td-p/5218186

const getAccessToken = async () => {
  return await axios()
    .then(({ data }) => {
      console.log(data);
      return data.access_token;
    })
    .catch((e) => console.log("Err on getting token", e));
};

const getBand = async (searchString, token) => {
  return await axios({
    method: "get",
    url: "https://api.spotify.com/v1/search",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: searchString,
      type: "artist",
      limit: 1,
    },
  })
    .then(({ data }) => data)
    .catch((e) => console.log("Err on getting band", e));
};

let accessToken = "";

const throttledFetchAccessToken = throttle(
  async () => {
    console.log(new Date());
    return await getAccessToken();
  },
  3600000,
  {
    trailing: true,
  }
);

export const fetchBandImage = async (searchString) => {
  accessToken = await throttledFetchAccessToken();
  const bandInfo = await getBand(searchString, accessToken);
  console.log("images", bandInfo.artists.items[0].images);
  return bandInfo.artists.items[0].images[0].url;
};

export const useSpotify = (searchString) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    // const init = async () => {
    //   const image = await fetchBandImage(searchString);
    //   setImage(image);
    // };
    // init();
  }, []);

  return image;
};
