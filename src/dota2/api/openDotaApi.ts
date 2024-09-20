// src/dota2/api/openDotaApi.ts

import axios, { AxiosError } from 'axios';
import mockPlayerResponse from './MockPlayerResponse.json';
import mockPlayerHeroesResponse from './MockPlayerHeroesResponse.json';
import mockPlayerMatchesResponse from './MockPlayerMatchesResponse.json';
import mockPlayerWLResponse from './MockPlayerWLResponse.json';
import mockMatchResponse from './MockMatchResponse.json';

const API_BASE_URL = "https://api.opendota.com/api";

// Utility function for retrying requests with exponential backoff
const apiGetWithRetry = async (
  url: string,
  retries: number = 5,
  delay: number = 1000
): Promise<any> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (
      axiosError.response &&
      axiosError.response.status === 429 &&
      retries > 0
    ) {
      // Too Many Requests - Retry after a delay
      console.log(
        `Rate limit exceeded. Retrying in ${delay / 1000} seconds...`
      );
      await new Promise((res) => setTimeout(res, delay));
      return apiGetWithRetry(url, retries - 1, delay * 2); // Exponential backoff
    } else {
      // Throw error if retries exhausted or other error
      console.error("Error fetching data:", axiosError);
      throw axiosError;
    }
  }
};

/* ----- Real API calls ----- */
// Get player data
export const apiGetPlayer = (accountId: string) => {
  return apiGetWithRetry(`${API_BASE_URL}/players/${accountId}`);
};

// Get player matches with optional limit
export const apiGetPlayerMatches = (accountId: string, limit: number = 10) => {
  return apiGetWithRetry(
    `${API_BASE_URL}/players/${accountId}/matches?limit=${limit}`, 5, 1000);
};
// Get player heroes
export const apiGetPlayerHeroes = (accountId: string) => {
  return apiGetWithRetry(`${API_BASE_URL}/players/${accountId}/heroes`);
};

// Get player win/loss data
export const apiGetPlayerWinLoss = (accountId: string) => {
  return apiGetWithRetry(`${API_BASE_URL}/players/${accountId}/wl`);
};

// Get match data
export const apiGetMatch = (matchId: string) => {
  return apiGetWithRetry(`${API_BASE_URL}/matches/${matchId}`);
};

/* ----- Mock API calls ----- */
export const mockGetPlayer = () => Promise.resolve(mockPlayerResponse);
export const mockGetPlayerMatches = () => Promise.resolve(mockPlayerMatchesResponse);
export const mockGetPlayerHeroes = () => Promise.resolve(mockPlayerHeroesResponse);
export const mockGetPlayerWinLoss = () => Promise.resolve(mockPlayerWLResponse);
export const mockGetMatch = () => Promise.resolve(mockMatchResponse);