import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './HeaderFooter/Header.js';
import Registration from './Authentication/Registration.js';
import Login from './Authentication/Login.js';
import Home from './Home/Home.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="*" component={Home} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
