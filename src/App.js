import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Survey from "./pages/Survey";

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/survey" component={Survey} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
