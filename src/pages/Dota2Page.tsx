import React from 'react';
import PlayerPerformanceDashboard from '../components/dota2/PlayerPerformanceDashboard/PlayerPerformanceDashboard';
import HeroMatchupAnalyzer from '../components/dota2/HeroMatchupAnalyzer';
import MatchRecap from '../components/dota2/MatchRecap';

const Dota2Page: React.FC = () => {
  return (
    <div>
      <PlayerPerformanceDashboard />
      <HeroMatchupAnalyzer />
      <MatchRecap />
    </div>
  );
};

export default Dota2Page;