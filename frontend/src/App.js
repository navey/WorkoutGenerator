import React from 'react';

import Navigation from './components/Navigation';
import Home from './components/Home';
import Generator from './components/Generator';
import About from './components/About';

import './App.css';
import './generatorStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  render(){
    return (
      <div className="App">
        <Navigation />
        <Home />
        <Generator />
        <About />
      </div>
    );
  }
}

export default App;
