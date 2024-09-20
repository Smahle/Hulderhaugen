// src/dota2/components/PlayerPerformance/StatsSection.tsx

import styles from '../../styles/Dota2.module.css';
import { Player } from '../../data/playerData.ts';
import { getRankDetails } from '../../data/rankUtils.ts';

type StatsSectionProps = {
    player: Player;
};

export default function StatsSection({ player }: StatsSectionProps) {
    const rankDetails = getRankDetails(player.rank_tier);

    return (
        <div className={styles.sectionItem}>
            <div className={styles.statsSection}>
                <div className={styles.statsSectionLeft}>
                    <h3>Stats</h3>
                    <p>Win Rate: {(player.winLoss.win / (player.winLoss.win + player.winLoss.lose) * 100).toFixed(2)}%</p>
                    <p>Kills: {player.avgKDA.kills}</p>
                    <p>Deaths: {player.avgKDA.deaths}</p>
                    <p>Assists: {player.avgKDA.assists}</p>
                </div>
                <div className={styles.statsSectionMiddle}>
                    <img src={rankDetails.img} alt={rankDetails.name} className={styles.rankImage} />
                </div>
                <div className={styles.statsSectionRight}>
                    <img src={player.profile.avatarfull} alt={`${player.profile.personaname}_avatar`} className={styles.playerAvatarFull} />
                </div>
            </div>
        </div>
    );
}
