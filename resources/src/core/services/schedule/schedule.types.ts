export interface Event {
  id: number;
  title: string;
  color: string;
  location: string;
  start_date: string;
  final_date: string;
  responsible: {
    id: number;
    name: string;
    email: string;
  };
}

export interface EventListQuery {
  start_date?: string;
  final_date?: string;
}

export interface EventRequest {
  id?: number;
  title: string;
  color: string;
  location: string;
  start_date: Date | null;
  final_date: Date | null;
  responsible_id: number | null;
}
