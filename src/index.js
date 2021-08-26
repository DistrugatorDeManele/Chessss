import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './Homepage';
import Game from './Game';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const io = require('socket.io-client');
const socket = io('http://localhost:3000/');
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/game">
          <Game socket={socket} />
        </Route>
        <Route path="/">
          <Homepage socket={socket} />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
