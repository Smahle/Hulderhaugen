import Square from "./Square";
import { useState } from "react";
import classes from "./Board.module.css";
import ResetButton from "./ResetButton";
import HighScores from "./Highscore";

function Board() {
  const [xNext, setXNext] = useState(false);
  const [squaresTaken, setSquaresTaken] = useState(0);
  const [boardArray, setBoardArray] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [gameReset, setGameReset] = useState(false);
  const [highScoreArray, setHighScoreArray] = useState(Array);

  function game(id: number, currentSquaresTaken: number) {
    const currentPlayer = xNext ? "X" : "O";
    setXNext(!xNext);
    setSquaresTaken((prev) => prev + 1);

    setBoardArray((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[id] = currentPlayer;
      if (
        checkVertical(newBoard) ||
        checkHorizontal(newBoard) ||
        checkDiagonal(newBoard)
      ) {
        setGameOver(true);
      }
      return newBoard;
    });

    return { currentPlayer, squaresTaken: currentSquaresTaken + 1 };
  }

  function resetGame() {
    setXNext(false);
    setSquaresTaken(0);
    setBoardArray(Array(9).fill(null));
    setGameOver(false);
    setGameReset(true);
    setTimeout(() => {
      setGameReset(false);
    }, 0);
  }

  return (
    <div className={classes.outerContainer}>
      <div>
        {(squaresTaken >= 9 ||
          checkHorizontal(boardArray) ||
          checkVertical(boardArray) ||
          checkDiagonal(boardArray)) && (
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
                gameReset={gameReset}
                gameInBoard={game}
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

function checkVertical(array: string[]): boolean {
  for (let i = 0; i < 3; i++) {
    if (
      array[i] !== null &&
      array[i] === array[i + 3] &&
      array[i] === array[i + 6]
    ) {
      return true;
    }
  }
  return false;
}

function checkHorizontal(array: string[]): boolean {
  for (let i = 0; i < 9; i += 3) {
    if (
      array[i] != null &&
      array[i] === array[i + 1] &&
      array[i] === array[i + 2]
    ) {
      return true;
    }
  }
  return false;
}

function checkDiagonal(array: string[]): boolean {
  if (array[0] != null && array[0] === array[4] && array[0] === array[8]) {
    return true;
  }
  if (array[2] != null && array[2] === array[4] && array[2] === array[6]) {
    return true;
  }
  return false;
}

export default Board;
