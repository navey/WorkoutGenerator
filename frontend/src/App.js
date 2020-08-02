import React from 'react';
import {
  Route,
  HashRouter
} from "react-router-dom";

import User from './components/User';
import Admin from './components/Admin';

import './App.css';
import './generatorStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <HashRouter>
          <Route exact path='/' component={User} />
          <Route path='/admin' component={Admin} />
        </HashRouter>
      </div>
    );
  }
}

export default App;
