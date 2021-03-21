import axios from "axios";

const getAccessToken = async () => {
  return await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic MzA0OTdkOTRiYjMwNGYyNjhhMzY4ZDdjMWRiODFkMzk6ZDBiYjYzZmVkMTA1NDQ4NTlkYTdiMmVlMjMwMjk2YTI=",
    },
    data: "grant_type=client_credentials",
  }).then(({ data }) => data.access_token);
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
    // data: "grant_type=client_credentials",
    params: {
      q: searchString,
      type: "artist",
      limit: 1,
    },
  }).then(({ data }) => data);
};

export const fetchBandImage = async (searchString) => {
  const accessToken = await getAccessToken();
  const bandInfo = await getBand(searchString, accessToken);
  console.log(bandInfo.artists.items[0].images);
  return bandInfo.artists.items[0].images[0].url;
};
