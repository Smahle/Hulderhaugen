// src/dota2/data/heroUtils.ts

import { heroData } from './heroData'; // Assuming you have a utility function for hero details

export const getHeroDetails = (heroId: number) => {
    const hero = heroData.find((h) => h.id === heroId);
    return hero ? {
        name: hero.name,
        img: hero.img,
    } : { name: 'Unknown Hero', img: '' };
};