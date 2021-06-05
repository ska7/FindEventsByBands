import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Input } from "./components/Input";

import { Favorites } from "./components/Favorites";
import { EventDetails } from "./components/EventDetails";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./components/Theme";
import { Band } from "./components/Band";
import { SimilarBands } from "./components/SimilarBands";
import { FavoritesContextProvider } from "./components/context/favoritesContext";
import { EventsCarousel } from "./components/EventsCarousel";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <>
                  <Input />
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
                  <Input />
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
                  <Input />
                  <FavoritesContextProvider>
                    <EventDetails {...props} />
                    <Favorites />
                  </FavoritesContextProvider>
                </>
              )}
            />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
