import { useEffect, useState } from "react";
import classes from "./Square.module.css";

// Define the props type for the Square component
type externalProps = {
  id: number;
  gameOver: boolean;
  gameReset: boolean;
  gameInBoard: (
    id: number,
    value: number
  ) => {
    currentPlayer: string;
    squaresTaken: number;
  };
};
type internalState = {
  value: string | null;
  squaresTaken: number;
};

// Functional component with typed props
const Square: React.FC<externalProps> = ({
  id,
  gameOver,
  gameReset,
  gameInBoard: gameInBoard,
}) => {
  const [state, setState] = useState<internalState>({
    value: null,
    squaresTaken: 0,
  });

  useEffect(() => {
    if (gameReset) {
      setState({ value: null, squaresTaken: 0 });
    }
  }, [gameReset]);

  function handleClick() {
    if (!state.value) {
      const { currentPlayer, squaresTaken } = gameInBoard(
        id,
        state.squaresTaken
      );
      setState({
        value: currentPlayer,
        squaresTaken: squaresTaken,
      });
    }
  }
  return (
    <button
      className={classes.squareSize}
      disabled={gameOver}
      onClick={handleClick}
    >
      {state.value}
    </button>
  );
};

export default Square;
