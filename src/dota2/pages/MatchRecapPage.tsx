import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MatchRecap from '../components/MatchRecap/MatchRecap';
import { mockGetMatch } from '../api/openDotaApi';
import { Match } from '../types';
import styles from '../styles/Dota2.module.css'; // Import the CSS module for consistent styling

export default function MatchRecapPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMatch = async () => {
      try {
        const mockMatch = await mockGetMatch(); // Replace with real API call if necessary
        setMatch(mockMatch as Match);
      } catch (err) {
        setError('Failed to load match details.');
      } finally {
        setLoading(false);
      }
    };
    getMatch();
  }, [matchId]);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.header}>Match Recap</h1>
        <p>Analyze detailed match statistics and performance metrics.</p>
        <p>Example Match ID: 7915609070</p>
        {loading ? (
          <p className={styles.loadingParagraph}>Loading...</p>
        ) : error ? (
          <p className={styles.errorParagraph}>{error}</p>
        ) : (
          match && <MatchRecap match={match} />
        )}
      </div>
    </div>
  );
}
