import useSWR from 'swr';
import { PlayerWeeklyView, ServerTiming } from '../types';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface UseHuntDataParams {
  week?: string; // ISO date string for the week start
}

interface HuntDataResponse {
  players: PlayerWeeklyView[];
  serverTiming: ServerTiming;
}

export function useHuntData({ week }: UseHuntDataParams = {}) {
  // If no week is provided, it will fetch the current week's data
  const urlParams = week ? `?week=${week}` : '';
  const { data, error, isLoading, mutate } = useSWR<HuntDataResponse>(
    `/api/hunt-data${urlParams}`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate, // Allow manual revalidation if needed
  };
}