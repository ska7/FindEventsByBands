import react, { useEffect } from "react";

import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Search } from "./components/Search";
import { Favorites } from "./components/Favorites";
import { SimilarBands } from "./components/SimilarBands";
import { FavoritesContextProvider } from "./components/context/favoritesContext";
import { EventsCarousel } from "./components/EventsCarousel";
import { FavoriteEvent } from "./components/FavoriteEvent";
import { theme } from "./components/Theme";
import { Band } from "./components/Band";

import { Container, ThemeProvider, useTheme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useCustomStyles = (WidthUp1025) => {
  if (!WidthUp1025) {
    return makeStyles((theme) =>
      createStyles({
        mainAppContainer: {
          background: `radial-gradient(
            circle,
            rgba(2, 0, 36, 1) 0%,
            rgba(169, 169, 169, 1) 0%,
            rgba(169, 169, 169, 1) 47%,
            rgba(145, 144, 144, 1) 100%
          )`,
          display: "grid",
          padding: 0,
          margin: 0,
          overflow: "hidden",
          height: "100vh",
          width: "100vw",
          gridTemplateColumns: "3fr 1fr",
          gridTemplateRows: "1fr 5fr",
          gridTemplateAreas: `
      "search favorites"
      "event favorites"
      `,
        },
        // Tablets
      })
    );
  } else if (WidthUp1025) {
    return makeStyles((theme) =>
      createStyles({
        mainAppContainer: {
          display: "grid",
          gridTemplateColumns: "1.5fr 3fr 1fr",
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
          gridTemplateAreas: `"search event favorites"`,
        },
      })
    );
  }
};

const App = () => {
  const WidthUp1025 = useMediaQuery("(min-width:1025px)");
  const classes = useCustomStyles(WidthUp1025)();

  useEffect(() => {
    console.log(theme.breakpoints.values);
  }, []);
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
