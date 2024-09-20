// src/dota2/data/rankUtils.ts

import { rankData } from './rankData';

export const getRankDetails = (rankTier: number) => {
    const rank = rankData.find((r) => r.rank_tier === rankTier);
    return rank ? {
        name: rank.name,
        img: rank.img,
    } : { name: 'Unknown Rank', img: 'https://static.wikia.nocookie.net/dota2_gamepedia/images/e/e7/SeasonalRank0-0.png' };
};