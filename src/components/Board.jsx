import React from "react";
import Square from "./Square";
import { useState } from "react";

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  console.log(squares);

  function handleClick(i) {
    // ! Bug: When button is clicked twice the X and O are toggled
    // * Fix: When a button is clicked the X || O remains and is not changed until the game restarts

    // ! Bug: When one player wins the other player is still able to make a turn
    // * Fix: When one player wins the other player should NOT be able to make a turn
    if (squares[i] || calculateWinner(squares)) return;

    // ? creates a copy of arr
    /** why ???
     *  state should be immutable so we should not change it directly
     *  create a copy of state and update the values from the copy
     *  then update state with a setter f() `setSquares`
     */
    const nextSquares = squares.slice();

    // TODO: Refactor Code
    // if (xIsNext) {
    //   nextSquares[i] = "👾";
    // } else {
    //   nextSquares[i] = "🐙";
    // }

    xIsNext ? (nextSquares[i] = "👾") : (nextSquares[i] = "🐙");

    // update values of state
    setSquares(nextSquares);
    // update state xIsNext
    setXIsNext(!xIsNext);
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
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
