import Square from "./Square";
import { useEffect, useState } from "react";
import classes from "./Board.module.css";
import ResetButton from "./ResetButton";
import HighScores from "./Highscore";

type HighScore = {
  playerName: string;
  score: number;
};

function Board() {
  const [xNext, setXNext] = useState(false);
  const [squaresTaken, setSquaresTaken] = useState(0);
  const [boardArray, setBoardArray] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [highScoreArray, setHighScoreArray] = useState<HighScore[]>([
    { playerName: "X", score: 0 },
    { playerName: "O", score: 0 },
  ]);

  function game(id: number): string | null {
    if (gameOver || boardArray[id]) return null; // Return null if the game is over or the square is taken

    const currentPlayer = xNext ? "X" : "O";
    setXNext(!xNext);
    setSquaresTaken((prev) => prev + 1);

    const newBoard = [...boardArray];
    newBoard[id] = currentPlayer;
    setBoardArray(newBoard);

    let winner = null;
    if (
      checkXVertical(newBoard) ||
      checkXHorizontal(newBoard) ||
      checkXDiagonal(newBoard)
    ) {
      winner = "X";
    } else if (
      checkOVertical(newBoard) ||
      checkOHorizontal(newBoard) ||
      checkODiagonal(newBoard)
    ) {
      winner = "O";
    }

    if (winner) {
      setGameOver(true);
      setHighScoreArray((prev) =>
        prev.map((player) =>
          player.playerName === winner
            ? { ...player, score: player.score + 1 }
            : player
        )
      );
    }

    return currentPlayer; // Return the current player after the move
  }

  function resetGame() {
    setXNext(false);
    setSquaresTaken(0);
    setBoardArray(Array(9).fill(null));
    setGameOver(false);
  }

  return (
    <div className={classes.outerContainer}>
      <div>
        {gameOver && (
          <div className="alert alert-primary" role="alert">
            GAME OVER
          </div>
        )}
        <ul className={classes.container}>
          {boardArray.map((_, index) => (
            <li key={index}>
              <Square
                id={index}
                gameOver={gameOver}
                gameReset={gameOver}
                gameInBoard={game} // Pass the game function
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.resetButton}>
        <ResetButton resetGame={resetGame} />
      </div>
      <div className={classes.resetButton}>
        <HighScores />
      </div>
    </div>
  );
}

// ... (other functions like checkXVertical, checkOVertical, etc.)

export default Board;

function checkXVertical(array: string[]): boolean {
  for (let i = 0; i < 3; i++) {
    if (
      array[i] === "X" &&
      array[i] === array[i + 3] &&
      array[i] === array[i + 6]
    ) {
      return true;
    }
  }
  return false;
}

function checkOVertical(array: string[]): boolean {
  for (let i = 0; i < 3; i++) {
    if (
      array[i] === "O" &&
      array[i] === array[i + 3] &&
      array[i] === array[i + 6]
    ) {
      return true;
    }
  }
  return false;
}

function checkXHorizontal(array: string[]): boolean {
  for (let i = 0; i < 9; i += 3) {
    if (
      array[i] === "X" &&
      array[i] === array[i + 1] &&
      array[i] === array[i + 2]
    ) {
      return true;
    }
  }
  return false;
}

function checkOHorizontal(array: string[]): boolean {
  for (let i = 0; i < 9; i += 3) {
    if (
      array[i] === "O" &&
      array[i] === array[i + 1] &&
      array[i] === array[i + 2]
    ) {
      return true;
    }
  }
  return false;
}

function checkXDiagonal(array: string[]): boolean {
  if (array[0] === "X" && array[0] === array[4] && array[0] === array[8]) {
    return true;
  }
  if (array[2] === "X" && array[2] === array[4] && array[2] === array[6]) {
    return true;
  }
  return false;
}

function checkODiagonal(array: string[]): boolean {
  if (array[0] === "O" && array[0] === array[4] && array[0] === array[8]) {
    return true;
  }
  if (array[2] === "O" && array[2] === array[4] && array[2] === array[6]) {
    return true;
  }
  return false;
}
