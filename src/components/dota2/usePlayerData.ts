// usePlayerData.ts

import { useState } from 'react';
import { fetchPlayerData, fetchPlayerWinLoss, fetchPlayerMatches, fetchPlayerHeroes, fetchMockPlayerData, fetchMockPlayerWinLoss, fetchMockPlayerMatches, fetchMockPlayerHeroes } from '../../api/openDotaApi';


interface Match {
    match_id: number;
    hero_id: number;
    kills: number;
    deaths: number;
    assists: number;
    player_slot: number;
    radiant_win: boolean;
}

interface Hero {
    hero_id: number;
    games: number;
    win: number;
}

interface Player {
    profile: {
        personaname: string;
    };
    winLoss: { win: number; lose: number };
    avgKDA: { kills: string; deaths: string; assists: string };
    mostPlayedHeroes: { heroId: number; games: number; win: number }[];
    matches: Match[];
}

const playerIDs = [
    '35259661' // Bluum
    /*
    '25077635', // FEEDMACHINE
    '25094065'  // duckluck
    */
];

const usePlayerData = () => {
    const [playerStats, setPlayerStats] = useState<Player[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (useMock = false) => {
        setLoading(true);
        setError(null);
        try {
            const playerData = await Promise.all(
                playerIDs.map(async (id) => {
                    const fetchFunc = useMock ? fetchMockPlayerData : fetchPlayerData;
                    const fetchWinLossFunc = useMock ? fetchMockPlayerWinLoss : fetchPlayerWinLoss;
                    const fetchMatchesFunc = useMock ? fetchMockPlayerMatches : fetchPlayerMatches;
                    const fetchHeroesFunc = useMock ? fetchMockPlayerHeroes : fetchPlayerHeroes;

                    const player = await fetchFunc(id);
                    const winLoss = await fetchWinLossFunc(id);
                    const matches = await fetchMatchesFunc(id);
                    const heroes = await fetchHeroesFunc(id);

                    // Explicitly type the parameters of reduce and sort
                    const totalKills = matches.reduce((sum: number, match: any) => sum + match.kills, 0);
                    const totalDeaths = matches.reduce((sum: number, match: any) => sum + match.deaths, 0);
                    const totalAssists = matches.reduce((sum: number, match: any) => sum + match.assists, 0);

                    const avgKDA = matches.length
                        ? {
                            kills: (totalKills / matches.length).toFixed(2),
                            deaths: (totalDeaths / matches.length).toFixed(2),
                            assists: (totalAssists / matches.length).toFixed(2),
                        }
                        : { kills: '0', deaths: '0', assists: '0' };

                    const mostPlayedHeroes = heroes
                        .map((hero: Hero) => ({
                            heroId: hero.hero_id,
                            games: hero.games,
                            win: hero.win,
                        }))
                        .sort((a: { games: number }, b: { games: number }) => b.games - a.games)
                        .slice(0, 10);

                    return { ...player, winLoss, avgKDA, mostPlayedHeroes, matches };
                })
            );

            setPlayerStats(playerData);
        } catch (err) {
            setError('Failed to fetch player stats');
        } finally {
            setLoading(false);
        }
    };

    return { playerStats, loading, error, fetchData };
};

export default usePlayerData;
