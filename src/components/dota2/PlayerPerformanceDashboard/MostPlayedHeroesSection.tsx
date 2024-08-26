import React from 'react';
import { getHeroDetails } from '../../../data/heroUtils';
import styles from '../Dota2Page.module.css';

interface MostPlayedHeroesSectionProps {
    heroes: { heroId: number; games: number; win: number }[];
}

const MostPlayedHeroesSection: React.FC<MostPlayedHeroesSectionProps> = ({ heroes }) => {
    return (
        <div className={styles.sectionItem}>
            <h3>Most Played Heroes</h3>
            <div className={styles.heroTable}>
                <div className={styles.heroTableHeader}>
                    <span className={styles.heroTableColumn}>Hero</span>
                    <span className={styles.heroTableColumn}>Matches</span>
                    <span className={styles.heroTableColumn}>Winrate</span>
                </div>
                <ul className={styles.heroList}>
                    {heroes.map((hero) => {
                        const heroDetails = getHeroDetails(hero.heroId);
                        const winRate = (hero.win / hero.games * 100).toFixed(2);

                        return (
                            <li key={hero.heroId} className={styles.heroItem}>
                                <span className={styles.heroTableColumn}>
                                    <div className={styles.heroImageContainer}>
                                        <img src={heroDetails.img} alt={heroDetails.name} className={styles.heroImage} />
                                    </div>
                                </span>
                                <span className={styles.heroTableColumn}>{hero.games}</span>
                                <span className={styles.heroTableColumn}>{winRate}%</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default MostPlayedHeroesSection;
