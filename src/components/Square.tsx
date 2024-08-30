import { useEffect, useState } from "react";
import classes from "./Square.module.css";

type externalProps = {
  id: number;
  gameOver: boolean;
  gameReset: boolean;
  gameInBoard: (id: number) => string | null; // Return type is string | null
};

export default function Square({
  id,
  gameOver,
  gameReset,
  gameInBoard,
}: externalProps) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (gameReset) {
      setValue(null); // Reset square value when the game is reset
    }
  }, [gameReset]);

  function handleClick() {
    if (!value && !gameOver) {
      const currentPlayer = gameInBoard(id); // Get the current player
      setValue(currentPlayer); // Set the value of the square to the current player
    }
  }

  return (
    <button
      className={classes.squareSize}
      disabled={gameOver}
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
