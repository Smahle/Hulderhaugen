import styles from '../../styles/Dota2.module.css';
import { Match } from '../../types';
import { getHeroDetails } from '../../data/heroUtils'; // Import the utility function

type MatchRecapProps = {
  match: Match;
}

export default function MatchRecap({ match }: MatchRecapProps) {
  return (
    <div className={styles.container}> {/* Use container for consistent padding */}
      <h3>Match ID: {match.match_id}</h3>
      <p>Duration: {match.duration} seconds</p>
      <p>Result: {match.radiant_win ? 'Radiant Victory' : 'Dire Victory'}</p>

      <div className={styles.tableContainer}> {/* Use a table container for consistent table styling */}
        <h3>Player Performance</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Hero</th> {/* Updated header */}
              <th>Kills</th>
              <th>Deaths</th>
              <th>Assists</th>
              <th>GPM</th>
              <th>XPM</th>
            </tr>
          </thead>
          <tbody>
            {match.players.map(player => {
              const heroDetails = getHeroDetails(player.hero_id); // Get hero details
              return (
                <tr key={player.account_id}>
                  <td>
                    <div className={styles.heroImageContainer}>
                      <img src={heroDetails.img} alt={heroDetails.name} className={styles.heroImage} />
                    </div>
                  </td>
                  <td>{player.kills}</td>
                  <td>{player.deaths}</td>
                  <td>{player.assists}</td>
                  <td>{player.gold_per_min}</td>
                  <td>{player.xp_per_min}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.sectionContainer}>
        <h3>Team Fight Participation</h3>
        <p>Hero contributions during major fights</p>

        <h3>Hero Matchups</h3>
        <p>Analyze individual hero matchups and lane outcomes</p>

        <h3>Match Timeline</h3>
        <ul>
          {/* Populate with key events */}
        </ul>

        <h3>Player Movement Heatmap</h3>
        <p>Analyze player positions during key moments</p>

        <h3>Net Worth Over Time</h3>
        {/* Add graph component here */}

        <h3>Hero Analysis</h3>
        <p>Compare hero performance against their average</p>
      </div>
    </div>
  );
}
