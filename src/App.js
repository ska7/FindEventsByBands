import react, { useEffect } from "react";

import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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

import { IconButton } from "@material-ui/core";
import { MobileTopBar } from "./components/MobileTopBar";

// TEST HOME ICON

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

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
      homeBtnWrapper: {
        position: "absolute",
        width: "50px",
        height: "50px",
        zIndex: "14",
        top: "15px",
        left: "15px",
        color: "white",
        "&:hover": {
          background: "none",
        },
      },
      homeBtn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        background: "#676563",
        height: "40px",
        width: "40px",
        padding: "5px",
        transition: "all 0.5s ease",
        "&:hover": {
          background: "rgba(0,0,0,0.7)",
        },
      },
      link: {
        color: "white",
        textDecoration: "none",
      },
    })
  );
};

const App = () => {
  const classes = useCustomStyles()();

  const xsScreen = useMediaQuery("(max-width: 450px)");

  useEffect(() => {
    // console.log(theme.breakpoints.values);
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
                    <IconButton className={classes.homeBtnWrapper}>
                      <Link to={`/`} className={classes.link}>
                        <HomeOutlinedIcon className={classes.homeBtn} />
                      </Link>
                    </IconButton>
                    <Search />
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
                  <FavoritesContextProvider>
                    <IconButton className={classes.homeBtnWrapper}>
                      <Link to={`/`} className={classes.link}>
                        <HomeOutlinedIcon className={classes.homeBtn} />
                      </Link>
                    </IconButton>
                    <Search />
                    <Favorites />
                    <Band {...props} />
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
                    <IconButton className={classes.homeBtnWrapper}>
                      <Link to={`/`} className={classes.link}>
                        <HomeOutlinedIcon className={classes.homeBtn} />
                      </Link>
                    </IconButton>
                    <Search />
                    <Favorites />
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
