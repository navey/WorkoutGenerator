import React from 'react';

import Navigation from './Navigation';
import Home from './Home';
import Generator from './Generator';
import About from './About';

import '../generatorStyle.css';

export default class User extends React.Component {
    render(){
      return (
        <div className="user">
            <Navigation />
            <Home />
            <Generator />
            <About />
        </div>
      );
    }
}
  