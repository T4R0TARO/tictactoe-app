import React from "react";
import Square from "./Square";
import { useState } from "react";

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  console.log(squares);

  function handleClick(i) {
    // Bug: When button is clicked twice the X and O are toggled
    // Fix: When a button is clicked the X || O remains and is not changed until the game restarts
    if (squares[i]) return;

    // creates a copy of arr
    /** why?
     *  state should be immutable so we should not change it directly
     *  create a copy of state and update the values from the copy
     *  then update state with a setter f() `setSquares`
     */
    const nextSquares = squares.slice();

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

    // How can we calculate the winnner?
  }
  return (
    <>
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
