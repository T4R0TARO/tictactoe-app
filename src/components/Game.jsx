import React from "react";
import Board from "./Board";
import { useState } from "react";

// Game Component
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isMovesAscending, setIsMovesAscending] = useState(true);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // TODO: Add a toggle button that lets you sort the moves in either accending or descending order ✅

  function handleToggleAscending() {
    setIsMovesAscending(!isMovesAscending);
  }

  // TODO: For the current move ONLY, show "You are at move #..." instead of a button ✅
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
        {currentMove === move ? (
          <p className="current-move">
            {move === 0 ? `Game Start` : `You are at move #${move}`}
          </p>
        ) : (
          <button className="time-button" onClick={() => jumpTo(move)}>
            {description}
          </button>
        )}
      </li>
    );
  });

  // Sort moves based on sorting order
  const sortedMoves = isMovesAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button
          className="toggle-sorted-moves-btn"
          onClick={handleToggleAscending}
        >
          {isMovesAscending ? "Sort Descending" : "Sort Ascending"}
        </button>
        <ul>{sortedMoves}</ul>
      </div>
    </div>
  );
}
