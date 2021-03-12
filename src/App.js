import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { EventInfoModalLayout } from ".old-components/components/EventInfoModalLayout";
// import { FavoritesHeartButton } from ".old-components/components/FavoritesHeartButton";
import { Input } from "./components/Input";
// import { BandEventsWrapper } from ".old-components/components/BandEventsWrapper";

import { Favorites } from "./components/Favorites";
import { EventDetails } from "./components/EventDetails";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./components/Theme";
import { BandEvents } from "./components/BandEvents";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route
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
              path="band/:bandID"
              render={(props) => (
                <>
                  <Input />
                  <BandEvents />
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
