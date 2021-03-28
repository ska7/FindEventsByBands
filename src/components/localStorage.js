import { update } from "lodash";

export const updateFavorites = (action, event, cb = () => {}) => {
  const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  switch (action) {
    case "add":
      console.log("before push", existingFavorites);
      existingFavorites.push(event);
      console.log("upd", existingFavorites);
      localStorage.setItem(
        "favorites",
        JSON.stringify({
          favorites: existingFavorites,
        })
      );
      // console.log("existing favs", existingFavorites);

      break;
    case "delete":
      localStorage.removeItem(event.id);
      cb();
      break;
    default:
      break;
  }
};

export const getFavorites = (entries, cb) => {
  const res = entries.map((entry) => {
    return JSON.parse(entry[1]);
  });

  cb(res);
};
