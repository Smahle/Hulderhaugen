import React, { useState } from 'react';
import usePlayerData from '../usePlayerData'; // Adjust the path as necessary
import StatsSection from './StatsSection';
import MostPlayedHeroesSection from './MostPlayedHeroesSection';
import RecentMatchesSection from './RecentMatchesSection';
import styles from '../Dota2Page.module.css';

const PlayerPerformanceDashboard: React.FC = () => {
    const { playerStats, loading, error, fetchData } = usePlayerData();
    const [hasFetched, setHasFetched] = useState(false);

    const handleFetchData = async () => {
        setHasFetched(true);
        await fetchData();
    };

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.header}>Player Performance Dashboard</h1>
                <p>Here, you can analyze player statistics and performance metrics.</p>

                <button className={styles.button} onClick={handleFetchData}>
                    {hasFetched ? 'Refresh Data' : 'Fetch Data'}
                </button>

                {loading ? (
                    <p className={styles.loadingParagraph}>Loading...</p>
                ) : error ? (
                    <p className={styles.errorParagraph}>{error}</p>
                ) : (
                    playerStats.map((player, index) => (
                        <div key={index} className={styles.playerCard}>
                            <h2>{player.profile.personaname}</h2>
                            <div className={styles.sectionContainer}>
                                <StatsSection winLoss={player.winLoss} avgKDA={player.avgKDA} />
                                <MostPlayedHeroesSection heroes={player.mostPlayedHeroes} />
                                <RecentMatchesSection matches={player.matches} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PlayerPerformanceDashboard;
