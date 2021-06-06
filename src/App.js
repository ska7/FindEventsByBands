import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Search } from "./components/Search";
import { Favorites } from "./components/Favorites";
import { SimilarBands } from "./components/SimilarBands";
import { FavoritesContextProvider } from "./components/context/favoritesContext";
import { EventsCarousel } from "./components/EventsCarousel";
import { FavoriteEvent } from "./components/FavoriteEvent";

import { Container, ThemeProvider } from "@material-ui/core";
import { theme } from "./components/Theme";
import { Band } from "./components/Band";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    mainAppContainer: {
      display: "grid",
      gridTemplateColumns: "1.5fr 3fr 1fr",
      gridTemplateRows: "2fr 2fr",
      gridTemplateRows: "2fr 2fr",
      padding: 0,
      margin: 0,
      overflow: "hidden",
      height: "100vh",
      width: "100vw",
      background: `radial-gradient(
        circle,
        rgba(2, 0, 36, 1) 0%,
        rgba(169, 169, 169, 1) 0%,
        rgba(169, 169, 169, 1) 47%,
        rgba(145, 144, 144, 1) 100%
      )`,
      backgroundSize: "cover",
      gridTemplateAreas: `"search event favorites"
      "search event favorites"
      "similarBands event favorites"`,
    },
  })
);

const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container
        className={classes.mainAppContainer}
        disableGutters
        maxWidth="false"
      >
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <>
                  <Search />
                  <FavoritesContextProvider>
                    <EventsCarousel />
                    <Favorites />
                  </FavoritesContextProvider>
                </>
              )}
            />
            <Route
              exact
              path="/band/:bandName"
              render={(props) => (
                <>
                  <Search />
                  <SimilarBands />
                  <FavoritesContextProvider>
                    <Band {...props} />
                    <Favorites />
                  </FavoritesContextProvider>
                </>
              )}
            />
            <Route
              exact
              path="/event/:eventID"
              render={(props) => (
                <>
                  <Search />
                  <FavoritesContextProvider>
                    <FavoriteEvent {...props} />
                    <Favorites />
                  </FavoritesContextProvider>
                </>
              )}
            />
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
