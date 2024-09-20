// src/dota2/components/PlayerPerformance/RecentMatchesSection.tsx

import { useNavigate } from 'react-router-dom';
import { getHeroDetails } from '../../data/heroUtils';
import styles from '../../styles/Dota2.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // needed for the "Copy-icon" in the Match ID column

type TRecentMatchesProps = {
    matches: { match_id: number; hero_id: number; start_time: number, duration: number, kills: number; deaths: number; assists: number, player_slot: number, radiant_win: boolean }[];
}

export default function RecentMatchesSection({ matches }: TRecentMatchesProps) {
    // Function for copying Match ID on click
    const handleCopy = (id: number) => {
        navigator.clipboard.writeText(id.toString())
            .then(() => alert('Match ID copied to clipboard!'))
            .catch(err => alert('Failed to copy match ID: ' + err));
    };
    
    const navigate = useNavigate();

    const handleMatchClick = (matchId: number) => {
        navigate(`/dota2/match-recap/${matchId}`);
    }

    // Function to convert Unix timestamp to Norwegian date and time format
    const formatDateTime = (unixTimestamp: number) => {
        const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    
        // Format date as DD.MM.YY
        const formattedDate = date.toLocaleDateString('no-NO', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        });
    
        // Format time as HH:MM
        const formattedTime = date.toLocaleTimeString('no-NO', {
            hour: '2-digit',
            minute: '2-digit',
        });
    
        return `${formattedDate} ${formattedTime}`;
    };


    // Function to format the match duration into minutes
    const formatDuration = (duration: number) => {
        const minutes = Math.floor(duration / 60); // Convert seconds to minutes
        return `${minutes}min`;
    };


    return (
        <div className={styles.recentMatchesSectionItem}>
            <h3>Recent Matches</h3>
            <div className={styles.matchTable}>
                <div className={styles.matchTableHeader}>
                    <span className={styles.matchTableColumn}>Hero</span>
                    <span className={styles.matchTableColumn}>Time</span>
                    <span className={styles.matchTableColumn}>Duration</span>
                    <span className={styles.matchTableColumn}>Result</span>
                    <span className={styles.matchTableColumn}>K/D/A</span>
                    <span className={styles.matchTableColumn}>ID</span>
                </div>
                <ul className={styles.matchList}>
                    {matches.map((match) => {
                        const heroDetails = getHeroDetails(match.hero_id);
                        const isRadiant = match.player_slot < 128;
                        const matchResult = (isRadiant && match.radiant_win) || (!isRadiant && !match.radiant_win) ? 'win' : 'loss';
                        return (
                            <li key={match.match_id} className={styles.matchItem} onClick={() => handleMatchClick(match.match_id)}>
                                <span className={styles.matchTableColumn}>
                                    <div className={styles.heroImageContainer}>
                                        <img src={heroDetails.img} alt={heroDetails.name} className={styles.heroImage} />
                                    </div>
                                </span>
                                <span className={styles.matchTableColumn}>
                                    {formatDateTime(match.start_time)}
                                </span>
                                <span className={styles.matchTableColumn}>
                                    {formatDuration(match.duration)}
                                </span>
                                <span className={`${styles.matchTableColumn} ${matchResult === 'win' ? styles.win : styles.loss}`}>
                                    {matchResult}
                                </span>
                                <span className={styles.matchTableColumn}>
                                    {match.kills}/{match.deaths}/{match.assists}
                                </span>
                                <span className={styles.matchTableColumn}>
                                    <i
                                        className="fas fa-copy"
                                        onClick={() => handleCopy(match.match_id)}
                                        title="Copy Match ID"
                                    ></i>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
