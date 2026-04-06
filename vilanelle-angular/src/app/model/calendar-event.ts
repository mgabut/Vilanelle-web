export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO string
  end?: string;  // ISO string
  allDay?: boolean;
}