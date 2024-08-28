import axios, { AxiosError } from "axios";

const API_BASE_URL = "https://api.opendota.com/api";

// Utility function for retrying requests with exponential backoff
const fetchWithRetry = async (
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
      return fetchWithRetry(url, retries - 1, delay * 2); // Exponential backoff
    } else {
      // Throw error if retries exhausted or other error
      console.error("Error fetching data:", axiosError);
      throw axiosError;
    }
  }
};

// Get a list of all the heroes of Dota 2
export const fetchHeroList = () => {
  return fetchWithRetry(`${API_BASE_URL}/heroes`);
};

// Fetch player data
export const fetchPlayerData = (accountId: string) => {
  return fetchWithRetry(`${API_BASE_URL}/players/${accountId}`);
};

// Fetch player win/loss data
export const fetchPlayerWinLoss = (accountId: string) => {
  return fetchWithRetry(`${API_BASE_URL}/players/${accountId}/wl`);
};

// Fetch player matches with optional limit
export const fetchPlayerMatches = (accountId: string, limit: number = 10) => {
  return fetchWithRetry(
    `${API_BASE_URL}/players/${accountId}/matches?limit=${limit}`,
    5,
    1000
  );
};
// Fetch player heroes
export const fetchPlayerHeroes = (accountId: string) => {
  return fetchWithRetry(`${API_BASE_URL}/players/${accountId}/heroes`);
};
