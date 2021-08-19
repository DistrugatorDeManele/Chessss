import React, { Component } from 'react';
import { render } from 'react-dom';

import $ from 'jquery';
window.$ = require('jquery');

const Chessboard = require('chessboardjs');
const Chess = require('chess.js').Chess;

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: []
    };

    this.blackSquareGrey = '#696969';
    this.whiteSquareGrey = '#a9a9a9';

    this.game = new Chess();
    this.board = null;
  }

  componentDidMount() {
    var config = {
      position: 'start',
      pieceTheme:
        'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
      draggable: true,
      onChange: this.onChange,
      onDrop: this.onDrop,
      onDragStart: this.onDragStart
    };

    this.board = Chessboard('myBoard', config);
  }

  // only allow pieces to be dragged when the board is oriented
  // in their direction
  onDragStart = (source, piece, position, orientation) => {
    // get list of possible moves for this square
    var moves = this.game.moves({
      square: source,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // highlight the square they moused over
    this.greySquare(source);

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
      this.greySquare(moves[i].to);
    }
  };

  removeGreySquares = () => {
    $('#myBoard .square-55d63').css('background', '');
  };

  onDrop = (source, target) => {
    this.removeGreySquares();

    // see if the move is legal
    var move = this.game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return 'snapback';

    // updateStatus()

    this.setHistory(this.game.history({ verbose: true }));
  };

  setHistory = history => {
    let ar = [];
    while (history.length > 0) ar.push(history.splice(0, 2));

    this.setState({
      history: ar
    });
  };

  greySquare = square => {
    var $square = $('#myBoard .square-' + square);

    var background = this.whiteSquareGrey;
    if ($square.hasClass('black-3c85d')) {
      background = this.blackSquareGrey;
    }

    $square.css('background', background);
  };

  render() {
    return (
      <div>
        <div id="myBoard" style={{ width: '400px' }} />
        <div>
          <ul>
            {this.state.history.map(historyItem => {
              return <li>{historyItem.map(move => move.san + ' ')}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
