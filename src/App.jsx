import { useState } from "react";
import Game from "./components/Board";
import Square from ".//components/Square";
import "./App.css";

function App() {
  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <Game />
    </>
  );
}

export default App;
