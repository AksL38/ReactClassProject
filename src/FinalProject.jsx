import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Posts from "./Posts";

function FinalProject() {
  return (
    <Router>
      <Switch>
        <Route path="/posts">
          <Posts />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default FinalProject;
