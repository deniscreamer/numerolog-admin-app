export class DayTable {
  id: number;
  date: string;
  weekday: string;
  times: TimeIsFree[];
}

export interface TimeIsFree {
  time_at: string;
  time_to: string;
  free: boolean;
}
