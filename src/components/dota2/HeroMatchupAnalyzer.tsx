import styles from "./Dota2Page.module.css"; // Import CSS module

export default function HeroMatchupAnalyzer() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.header}>Hero Matchup Analyzer</h1>
        <p>
          Analyze and compare hero matchups to determine the best strategies.
        </p>
        {/* Add additional content and components as needed */}
      </div>
    </div>
  );
}
