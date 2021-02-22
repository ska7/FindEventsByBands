import "./App.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { EventInfoModalLayout } from "./components/EventInfoModalLayout";
import { FavoritesHeartButton } from "./components/FavoritesHeartButton";
import { Input } from "./components/Input";
import { BandEvents } from "./components/BandEvents";

function App() {
  return (
    <div className="App">
      <Router>
        <FavoritesHeartButton />
        <Input />
        <Switch>
          <Route path="/band/:bandID" component={BandEvents} />
          <Route path="/event/:eventID" component={EventInfoModalLayout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
