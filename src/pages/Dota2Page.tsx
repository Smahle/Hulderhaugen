// src/pages/Dota2Page.tsx

import PlayerPerformanceDashboard from "../components/dota2/PlayerPerformanceDashboard/PlayerPerformanceDashboard";
import HeroMatchupAnalyzer from "../components/dota2/HeroMatchupAnalyzer/HeroMatchupAnalyzer.tsx";
import MatchRecap from "../components/dota2/MatchRecap";

export default function Dota2Page() {
  return (
    <div>
      <PlayerPerformanceDashboard />
      <HeroMatchupAnalyzer />
      <MatchRecap />
    </div>
  );
}
