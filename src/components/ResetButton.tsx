import React from "react";

type externalProps = {
  resetGame: () => void;
};

const ResetButton: React.FC<externalProps> = ({ resetGame }) => {
  function handleClick() {
    resetGame();
  }

  return (
    <button style={{ padding: "" }} onClick={handleClick}>
      Reset
    </button>
  );
};

export default ResetButton;
