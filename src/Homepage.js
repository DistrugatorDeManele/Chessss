import React from 'react';
import './style.css';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import 'react-awesome-button/dist/themes/theme-red.css';
import { Link } from 'react-router-dom';
export default class App extends React.Component {
  render(){
    return (
      <div>
        <p>Chess.com</p>
        <Link
          to={{
            pathname: '/game'
          }}
        >
          <AwesomeButton> New Game </AwesomeButton>
        </Link>
      </div>
    );
  }
}
