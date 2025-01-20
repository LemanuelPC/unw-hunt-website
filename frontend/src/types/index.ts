// Represents a player account with all its details
export interface PlayerAccount {
  playerId: string;
  name: string;
  active: boolean;
  isAlt: boolean;
  userId: string;
}

// Represents the weekly progress for a player
export interface WeeklyProgress {
  playerId: string;
  totalPoints: number;
  goalPoints: number;
  lastWeekDebt: number;
  pointsToTrueGoal: number;
}

// Represents daily hunt data for a specific player
export interface DailyHuntData {
  userId: string;
  date: string;
  points: number;
}

// Combined data structure for a player's weekly view
export interface PlayerWeeklyView {
  playerId: string;
  accounts: PlayerAccount[];
  weeklyProgress: WeeklyProgress;
  huntData: {
    [userId: string]: number[];  // Array of 7 numbers representing each day
  };
}

// Search types for filtering the table
export type SearchType = 'playerId' | 'name';

// Supported languages
export type Language = 'en' | 'pt' | 'es';

// Server timing information
export interface ServerTiming {
  currentDateTime: string;
  nextHuntUpdate: string;
  latestHuntDate: string;
}