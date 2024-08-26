import React from 'react';
import styles from '../Dota2Page.module.css';

interface StatsSectionProps {
    winLoss: { win: number; lose: number };
    avgKDA: { kills: string; deaths: string; assists: string };
}

const StatsSection: React.FC<StatsSectionProps> = ({ winLoss, avgKDA }) => {
    return (
        <div className={styles.sectionItem}>
            <h3>Stats</h3>
            <p>Win Rate: {(winLoss.win / (winLoss.win + winLoss.lose) * 100).toFixed(2)}%</p>
            <p>Kills: {avgKDA.kills}</p>
            <p>Deaths: {avgKDA.deaths}</p>
            <p>Assists: {avgKDA.assists}</p>
        </div>
    );
};

export default StatsSection;
