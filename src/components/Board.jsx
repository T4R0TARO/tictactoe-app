import React from "react";
import Square from "./Square";
import { useState } from "react";

export default function Board({ xIsNext, squares, onPlay }) {
  const [winningSquares, setWinningSquares] = useState([]);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();

    xIsNext ? (nextSquares[i] = "🍙") : (nextSquares[i] = "🍘");

    onPlay(nextSquares);
  }

  // How can we calculate the winnner?
  // 1. What are all the winning conditions?
  // 2. Iterate through winning conditions
  // 3. Destructure all winning conditions
  // 4. Check if state matches winning conditions
  // 5. Check if player matches winning conditions
  // 6. Return the player with the winning conditions
  // 7. If no winning conditions return null
  function calculateWinner(squares) {
    // winning conditions
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // iterate through winning conditions
    for (let i = 0; i < lines.length; i++) {
      // destructure winning conditions in var
      // the winning conditions are the arr item positions in state
      // ex. 1,2,3 || 2,4,6 || etc...
      const [a, b, c] = lines[i];

      /** check if state contains items in the proper winning conditions
       *  check if state first item is === to the other 2 items (b and c)
       *  if item a is === to items a, b, c, return a
       *  otherwise return null
       */
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // return the winning player X || O
        if (winningSquares.length === 0) {
          setWinningSquares([a, b, c]);
        }
        return squares[a];
      }
    }
    // otherwise return null
    return null;
  }

  // contain winner value in var `winner`
  const winner = calculateWinner(squares);
  let status;

  // if there is a winner value
  // status will take on the value
  // if there is no current winner
  // status will will take on the value of the current player based on state `xisNext`
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "🍙" : "🍘");
  }

  // TODO: When someone wins, highlight the three squares that caused the win
  // TODO: When no one wins, display a message about result being a draw
  // TODO: Display the location for each move in the format(row,col) in the move history list

  // Generate 3x3 board of Square components
  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];

    for (let col = 0; col < 3; col++) {
      const squareIndex = row * 3 + col;
      squaresInRow.push(
        <Square
          key={col}
          value={squares[squareIndex]}
          onSquareClick={() => handleClick(squareIndex)}
          winningSquares={winningSquares}
          squareIndex={squareIndex}
        />
      );
    }

    boardRows.push(
      <div key={row} className="board-row">
        {squaresInRow}
      </div>
    );
  }

  // DISPLAY JSX
  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}
