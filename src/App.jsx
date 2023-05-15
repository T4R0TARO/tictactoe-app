import { useState } from "react";
import Board from "./components/Board";
import Square from ".//components/Square";
import "./App.css";

function App() {
  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </>
  );
}

export default App;
