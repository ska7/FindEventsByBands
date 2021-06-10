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

// const useCustomStyles = (WidthAbove1025) => {
//   return makeStyles((theme) =>
//     createStyles({
//       mainAppContainer: {
//         // =============================================================
//         // Tablets and small laptops
//         // =============================================================
//         [theme.breakpoints.up("sm")]: {
//           display: "grid",
//           background: `radial-gradient(
//                       circle,
//                       rgba(2, 0, 36, 1) 0%,
//                       rgba(169, 169, 169, 1) 0%,
//                       rgba(169, 169, 169, 1) 47%,
//                       rgba(145, 144, 144, 1) 100%
//                     )`,
//           padding: 0,
//           margin: 0,
//           overflow: "hidden",
//           height: "100vh",
//           width: "100vw",
//           gridTemplateColumns: "3fr 1fr",
//           gridTemplateRows: "0fr 1fr 2fr 1fr",
//           gridTemplateAreas: `
//                 ". favorites"
//                 "search favorites"
//                 "event favorites"
//                 ". favorites"
//                 `,
//         },
//         // ============================================================
//         // PC and big laptops
//         // ============================================================
//         [theme.breakpoints.up("lg")]: {
//           display: "grid",
//           gridTemplateColumns: "1.5fr 3fr 1fr",
//           padding: 0,
//           margin: 0,
//           overflow: "hidden",
//           height: "100vh",
//           width: "100vw",
//           background: `radial-gradient(
//                 circle,
//                 rgba(2, 0, 36, 1) 0%,
//                 rgba(169, 169, 169, 1) 0%,
//                 rgba(169, 169, 169, 1) 47%,
//                 rgba(145, 144, 144, 1) 100%
//               )`,
//           backgroundSize: "cover",
//           gridTemplateAreas: `"search event favorites"`,
//         },
//       },
//     })
//   );
// };

const useCustomStyles = (
  widthAbove1025,
  widthBetween1024and960,
  widthBetween959and600,
  widthBelow600
) => {
  return makeStyles((theme) => {
    // Tablets and big laptops
    if (widthAbove1025) {
      return createStyles({
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
      });
      // Tablets and small laptops
    } else if (widthBetween1024and960) {
      return createStyles({
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
          gridTemplateColumns: "3fr 1fr",
          gridTemplateRows: "0fr 1fr 2fr 1fr",
          gridTemplateAreas: `
                ". favorites"
                "search favorites"
                "event favorites"
                ". favorites"
                `,
        },
      });
    } else if (widthBetween959and600) {
      return createStyles({
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
          gridTemplateColumns: "3fr 1fr",
          gridTemplateRows: "0fr 1fr 2fr 1fr",
          gridTemplateAreas: `
                ". favorites"
                "search favorites"
                "event favorites"
                ". favorites"
                `,
        },
      });
    }
  });
};

const App = () => {
  const widthAbove1025 = useMediaQuery("(min-width: 1025px)");
  const widthBetween1024and960 = useMediaQuery(
    "(min-width: 960px) and (max-width: 1024px)"
  );
  const widthBetween959and600 = useMediaQuery(
    "(min-width: 600px) and (max-width: 959px)"
  );
  const widthBelow600 = useMediaQuery("min-width: 599px");

  // useEffect(() => {
  //   console.log(theme.breakpoints.values);
  // }, []);

  const classes = useCustomStyles(
    widthAbove1025,
    widthBetween1024and960,
    widthBetween959and600,
    widthBelow600
  )();
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

// const useCustomStyles = (
//   widthAbove1025,
//   widthBetween1024and960,
//   widthBetween959and600,
//   widthBelow600
// ) => {
//   return makeStyles((theme) => {
//     // Tablets and big laptops
//     if (widthAbove1025) {
//       return createStyles({

//       });
//       // Tablets and small laptops
//     } else if (widthBetween1024and960) {
//       return createStyles({

//       });
//     } else if (widthBetween959and600) {
//       return createStyles({

//       });
//     }
//     else if (widthBelow600) {
//       return createStyles({

//       });
//     }
//   });
// };
