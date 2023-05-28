import React from "react";

export default function Square({
  value,
  onSquareClick,
  winningSquares,
  squareIndex,
  row,
  col,
}) {
  const isWinningSquare = winningSquares.includes(squareIndex);

  return (
    <button
      className={`square ${isWinningSquare ? "winning" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
