// src/dota2/pages/PlayerPerformancePage.tsx

import { useState } from 'react';
import Slider from 'react-slick';
import usePlayerData from '../data/playerData'; // Adjust the path as necessary
import StatsSection from '../components/PlayerPerformance/StatsSection';
import MostPlayedHeroesSection from '../components/PlayerPerformance/MostPlayedHeroesSection';
import RecentMatchesSection from '../components/PlayerPerformance/RecentMatchesSection';
import styles from '../styles/Dota2.module.css';

export default function PlayerPerformancePage() {
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

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
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
                    <Slider {...carouselSettings}>
                        {playerStats.map((player, index) => (
                            <div key={index} className={styles.playerCard}>
                                <h2>{player.profile.personaname}</h2>
                                <div className={styles.statsSectionContainer}>
                                    <StatsSection player={player} />
                                </div>
                                <div className={styles.sectionContainer}>
                                    <MostPlayedHeroesSection heroesProps={player.mostPlayedHeroes} />
                                    <RecentMatchesSection matches={player.matches} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    );
};

