import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Input } from "./components/Input";

import { Favorites } from "./components/Favorites";
import { EventDetails } from "./components/EventDetails";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./components/Theme";
import { Band } from "./components/Band";

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
                  <EventDetails />
                  <Favorites />
                </>
              )}
            />
            <Route
              path="/band/:bandID"
              render={(props) => (
                <>
                  <Input />
                  <Band {...props} />
                  <Favorites />
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
/*  =============================== */

<Route
  path="/"
  render={(props) => (
    <>
      {/* <FavoritesHeartButton /> */}
      <Input {...props} />
    </>
  )}
/>;

<Route
  path="/band/:bandID"
  render={(props) => (
    <>
      {/* <FavoritesHeartButton /> */}
      <Input {...props} />
    </>
  )}
/>;
