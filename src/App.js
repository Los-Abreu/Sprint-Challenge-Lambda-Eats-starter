import React from "react";
import { Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Form from './Components/Form';

function App() {
  return (
    <div className="App">
        <Route exact path ='/'>
          <Home />
        </Route>
        <Route path="/form" component={Form}/>
    </div>
  );
};
export default App;
