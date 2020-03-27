import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Form from './Components/Form';

function App() {
  return (
    <Router>
        <Route exact path ='/'>
          <Home />
        </Route>
    </Router>
  );
};
export default App;
