export interface RecordRow {
  id?: number;
  eventId?: number;
  date?: string;
  entry?: string;
  exit?: string;
  breakTimeMinutes?: number;
  entryExpected?: string;
  exitExpected?: string;
  breakTimeMinutesExpected?: number;
}
