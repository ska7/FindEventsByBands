import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { EventInfoModalLayout } from "./components/EventInfoModalLayout";
import { FavoritesHeartButton } from "./components/FavoritesHeartButton";
import { Input } from "./components/Input";
import { BandEventsWrapper } from "./components/BandEventsWrapper";
import { Test } from "./components/Test";

function App() {
  return (
    <div className="App">
      <Router>
        <FavoritesHeartButton />
        <Input />
        <Switch>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/band/:bandID" component={BandEventsWrapper} />
          <Route path="/event/:eventID" component={EventInfoModalLayout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
