export interface DayData {
  id: number; // 1 to 90
  date: string; // ISO string
  completed: boolean;
}

export interface UserConfig {
  pattern: string;
  tool: string;
  startDate: string; // ISO string
  isConfigured: boolean;
}

export interface AppState {
  config: UserConfig;
  days: DayData[];
}

export interface Stats {
  completedCount: number;
  percentage: number;
  currentStreak: number;
  longestStreak: number;
}
