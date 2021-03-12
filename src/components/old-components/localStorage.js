export const updateFavorites = (action, event, cb) => {
  switch (action) {
    case "add":
      localStorage.setItem(event.id, JSON.stringify(event));
      cb();
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
