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
      <Router history={History}>
        <FavoritesHeartButton />
        <Switch>
          <Route path="/events/:bandID" component={BandEvents} />
          {/* <Route path="/events/:bandID/:eventID" component={EventInfoModal} /> */}
        </Switch>
        <Input />
      </Router>
    </div>
  );
}

export default App;
