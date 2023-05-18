import React from "react";
import Square from "./Square";
import { useState } from "react";

function Board({ xIsNext, squares, onPlay }) {
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

/**
 * move state to from <Board/> to <Game />
 */
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    // TODO:
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  // display move history buttons
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button className="time-button" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
