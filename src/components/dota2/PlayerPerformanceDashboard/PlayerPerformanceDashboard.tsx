// src/components/dota2/PlayerPerformanceDashboard/PlayerPerformanceDashboard.tsx

import { useState } from 'react';
import usePlayerData from '../usePlayerData'; // Adjust the path as necessary
import StatsSection from './StatsSection';
import MostPlayedHeroesSection from './MostPlayedHeroesSection';
import RecentMatchesSection from './RecentMatchesSection';
import styles from '../Dota2Page.module.css';

export default function PlayerPerformanceDashboard() {
    const { playerStats, loading, error, fetchData } = usePlayerData();
    const [hasFetched, setHasFetched] = useState(false);

    const handleFetchRealData = async () => {
        setHasFetched(true);
        await fetchData(false); // Fetch real data
    };

    const handleFetchMockData = async () => {
        setHasFetched(true);
        await fetchData(true); // Fetch mock data
    };


    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.header}>Player Performance Dashboard</h1>
                <p>Here, you can analyze player statistics and performance metrics.</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={handleFetchRealData}>
                        {hasFetched ? 'Refresh with Real Data' : 'Fetch Real Data'}
                    </button>
                    <button className={styles.button} onClick={handleFetchMockData}>
                        {hasFetched ? 'Refresh with Mock Data' : 'Fetch Mock Data'}
                    </button>
                </div>
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
                                <MostPlayedHeroesSection heroesProps={player.mostPlayedHeroes} />
                                <RecentMatchesSection matches={player.matches} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
