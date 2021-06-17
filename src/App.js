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

import {
  Container,
  Grid,
  Hidden,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useCustomStyles = (WidthAbove1025) => {
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
        [theme.breakpoints.up("sm")]: {
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

  const xsScreen = useMediaQuery("(max-width: 450px)");

  useEffect(() => {
    console.log(theme.breakpoints.values);
  }, []);
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
                    <Search />
                    <Favorites />
                    <EventsCarousel />
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

                    <Favorites
                      mobile={theme.breakpoints.down("sm") ? true : false}
                    />
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

                    <Favorites mobile={theme.breakpoints.down("sm")} />
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
