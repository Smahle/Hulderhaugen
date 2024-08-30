type externalProps = {
  resetGame: () => void;
};

export default function ResetButton({ resetGame }: externalProps) {
  function handleClick() {
    resetGame();
  }

  return (
    <button style={{ padding: "" }} onClick={handleClick}>
      Reset
    </button>
  );
}
