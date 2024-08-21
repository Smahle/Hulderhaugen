import { useState } from "react";

type HighScore = {
  playerName: string;
  score: number;
};

function HighScores() {
  const [highScoreArray, setHighScoreArray] = useState<HighScore[]>([]);

  const addHighScore = (playerName: string, score: number) => {
    setHighScoreArray((prevScores) => [...prevScores, { playerName, score }]);
  };

  return (
    <div>
      <button onClick={() => addHighScore("Alice", 150)}>Add Score</button>
      <ul>
        {highScoreArray.map((score, index) => (
          <li key={index}>
            {score.playerName}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HighScores;
