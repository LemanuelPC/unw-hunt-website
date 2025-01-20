import axios from 'axios';
import { PlayerWeeklyView, ServerTiming } from '@/types';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define the response types for our API endpoints
interface HuntDataResponse {
  players: PlayerWeeklyView[];
  serverTiming: ServerTiming;
}

// API functions for hunt data
export const huntDataApi = {
  // Fetch hunt data for a specific week
  getWeeklyData: async (weekStart?: string) => {
    const params = weekStart ? { weekStart } : {};
    const response = await api.get<HuntDataResponse>('/api/hunt-data', { params });
    return response.data;
  },

  // Fetch historical data for a player
  getPlayerHistory: async (playerId: string, startDate?: string, endDate?: string) => {
    const params = { startDate, endDate };
    const response = await api.get(`/api/players/${playerId}/history`, { params });
    return response.data;
  },
};

// Error handling middleware
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response);
    }

    // Customize error messages based on status codes
    if (error.response) {
      switch (error.response.status) {
        case 404:
          error.message = 'The requested resource was not found';
          break;
        case 500:
          error.message = 'An internal server error occurred';
          break;
        default:
          error.message = 'An error occurred while fetching data';
      }
    }

    return Promise.reject(error);
  }
);