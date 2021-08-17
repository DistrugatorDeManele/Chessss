import React from 'react';
import './style.css';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import 'react-awesome-button/dist/themes/theme-red.css';
export default function App() {
  return (
    <div>
      <p>Backgammon.com</p>
      <AwesomeButton type="primary">New Game</AwesomeButton>
    </div>
  );
}
