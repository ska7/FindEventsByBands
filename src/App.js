import React from "react";

import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Search } from "./components/Search/Search";
import { Favorites } from "./components/Favorites/Favorites";
import { FavoritesContextProvider } from "./components/context/favoritesContext";
import { EventCarousel } from "./components/EventCarousel";
import { FavoriteEvent } from "./components/Event/FavoriteEvent";
import { theme } from "./components/Theme";
import { Artist } from "./components/Artist";
import { Location } from "./components/Location";
import { MobileTopBar } from "./components/MobileTopBar";

import { Grid, ThemeProvider, useMediaQuery } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useCustomStyles = () => {
  return makeStyles((theme) =>
    createStyles({
      mainAppContainer: {
        display: "grid",
        background: `radial-gradient(
                      circle,
                      rgba(2, 0, 36, 1) 0%,
                      rgba(169, 169, 169, 1) 0%,
                      rgba(169, 169, 169, 1) 47%,
                      rgba(145, 144, 144, 1) 100%
                    )`,
        padding: 0,
        margin: 0,
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        // =============================================================
        // Mobile Devices
        // =============================================================
        [theme.breakpoints.down("xs")]: {
          backgroundColor: "#000000",
          backgroundImage: "linear-gradient(315deg, #000000 0%, #414141 74%)",
          gridTemplateRows: "0.5fr 5fr",
          gridTemplateAreas: `
                "search"
                "event"
                `,
        },

        // =============================================================
        // Tablets and small laptops
        // =============================================================
        [theme.breakpoints.up("xs")]: {
          gridTemplateColumns: "3fr 1fr",
          gridTemplateRows: "1fr 5fr",
          gridTemplateAreas: `
                "search favorites"
                "event favorites"
                `,
        },
        // ============================================================
        // PC and big laptops
        // ============================================================
        [theme.breakpoints.up("lg")]: {
          gridTemplateColumns: "1.5fr 3fr 1fr",
          backgroundSize: "cover",
          gridTemplateAreas: `"search event favorites"`,
        },
      },
    })
  );
};

const App = () => {
  const classes = useCustomStyles()();

  const smScreen = useMediaQuery("(max-width: 550px)");

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
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
                  <FavoritesContextProvider>
                    {smScreen ? (
                      <MobileTopBar />
                    ) : (
                      <>
                        <Search />
                        <Favorites />
                      </>
                    )}
                    <EventCarousel />
                  </FavoritesContextProvider>
                </>
              )}
            />
            <Route
              exact
              path="/artist/:artistName"
              render={(props) => (
                <>
                  <FavoritesContextProvider>
                    {smScreen ? (
                      <MobileTopBar />
                    ) : (
                      <>
                        <Search />
                        <Favorites />
                      </>
                    )}
                    <Artist {...props} />
                  </FavoritesContextProvider>
                </>
              )}
            />
            <Route
              exact
              path="/location/:locationName"
              render={(props) => (
                <>
                  <FavoritesContextProvider>
                    {smScreen ? (
                      <MobileTopBar />
                    ) : (
                      <>
                        <Search />
                        <Favorites />
                      </>
                    )}
                    <Location {...props} />
                  </FavoritesContextProvider>
                </>
              )}
            />
            <Route
              exact
              path="/event/:eventID"
              render={(props) => (
                <>
                  <FavoritesContextProvider>
                    {smScreen ? (
                      <MobileTopBar />
                    ) : (
                      <>
                        <Search />
                        <Favorites />
                      </>
                    )}
                    <FavoriteEvent {...props} />
                  </FavoritesContextProvider>
                </>
              )}
            />
          </Switch>
        </Router>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
