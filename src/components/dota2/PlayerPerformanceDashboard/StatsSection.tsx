import styles from '../Dota2Page.module.css';

type TStats = {
    winLoss: { win: number; lose: number };
    avgKDA: { kills: string; deaths: string; assists: string };
}

export default function StatsSection(statsProp: TStats){

    return (
        <div className={styles.sectionItem}>
            <h3>Stats</h3>
            <p>Win Rate: {(statsProp.winLoss.win / (statsProp.winLoss.win + statsProp.winLoss.lose) * 100).toFixed(2)}%</p>
            <p>Kills: {statsProp.avgKDA.kills}</p>
            <p>Deaths: {statsProp.avgKDA.deaths}</p>
            <p>Assists: {statsProp.avgKDA.assists}</p>
        </div>
    );
};
