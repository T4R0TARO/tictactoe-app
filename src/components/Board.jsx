import React from "react";
import Square from "./Square";
import { useState } from "react";

export default function Board({ xIsNext, squares, onPlay }) {
  const [winningSquares, setWinningSquares] = useState([]);

  /** handleClick()
   *  Check if the square is already filled  or there is a winner
   *  Set the value of the clicked square to the current player
   *  Call the onPlay() to update the game state
   * @param {* position in the state `squares`} i
   * @param {* position of square components row} row
   * @param {* position of square components column} col
   */
  function handleClick(i, row, col) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "🍙") : (nextSquares[i] = "🍘");
    onPlay(nextSquares, row, col);
  }

  /** calculateWinner()
   * Defines all possible winning conditions
   * Checks the first item matches the other items
   * Update state `winningSquares`
   * Checks if winning conditions are met
   * Return winning player
   * @param {* state of squares} squares
   * @returns winning player || null
   */
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
        if (winningSquares.length === 0) {
          setWinningSquares([a, b, c]);
        }
        // return the winning player 🍙 || 🍘
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every((square) => square !== null)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "🍙" : "🍘");
  }

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
          onSquareClick={() => handleClick(squareIndex, row, col)}
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
