import "./App.scss";
import { Search } from "./components/Search";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { EventInfoModal } from "./components/EventInfoModal";
import { TestComponent } from "./components/TestComponent";
import { FavoritesHeartButton } from "./components/FavoritesHeartButton";
import { Input } from "./components/Input";
import { BandEvents } from "./components/BandEvents";
import History from "./components/History";

function App() {
  return (
    <div className="App">
      <Router>
        <FavoritesHeartButton />
        <Input />
        <Switch>
          <Route path="/band/:bandID" component={BandEvents} />
          <Route path="/event/:eventID" component={EventInfoModal} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
