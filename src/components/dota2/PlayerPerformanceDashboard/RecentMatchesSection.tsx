import { getHeroDetails } from '../../../data/heroUtils';
import styles from '../Dota2Page.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // needed for the "Copy-icon" in the Match ID column

type TRecentMatchesProps = {
    matches: { match_id: number; hero_id: number; kills: number; deaths: number; assists: number, date: number,  player_slot: number, radiant_win: boolean }[];
}

export default function RecentMatchesSection({ matches }: TRecentMatchesProps) {
    // Function for copying Match ID on click
    const handleCopy = (id: number) => {
        navigator.clipboard.writeText(id.toString())
            .then(() => alert('Match ID copied to clipboard!'))
            .catch(err => alert('Failed to copy match ID: ' + err));
    };

    return (
        <div className={styles.sectionItem}>
            <h3>Recent Matches</h3>
            <div className={styles.matchTable}>
                <div className={styles.matchTableHeader}>
		    <span className={styles.matchTableColumn_large}>Date</span>
                    <span className={styles.matchTableColumn_small}>Hero</span>
                    <span className={styles.matchTableColumn_small}>Result</span>
                    <span className={styles.matchTableColumn_large}>K/D/A</span>
                    <span className={styles.matchTableColumn_small}>ID</span>
                </div>
                <ul className={styles.matchList}>
                    {matches.map((match) => {
                        const heroDetails = getHeroDetails(match.hero_id);
                        const isRadiant = match.player_slot < 128;
                        const matchResult = (isRadiant && match.radiant_win) || (!isRadiant && !match.radiant_win) ? 'win' : 'loss';
                        return (
                            <li key={match.match_id} className={styles.matchItem}>
                                <span className={styles.matchTableColumn_large}>
					{match.date}
				</span>
				<span className={styles.matchTableColumn_small}>
                                    <div className={styles.heroImageContainer}>
                                        <img src={heroDetails.img} alt={heroDetails.name} className={styles.heroImage} />
                                    </div>
                                </span>
                                <span className={`${styles.matchTableColumn_small} ${matchResult === 'win' ? styles.win : styles.loss}`}>
                                    {matchResult}
                                </span>
                                <span className={styles.matchTableColumn_large}>
                                    {match.kills}/{match.deaths}/{match.assists}
                                </span>
                                <span className={styles.matchTableColumn_small}>
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
