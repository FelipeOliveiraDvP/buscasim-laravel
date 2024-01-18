import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Event } from '@/core/services/schedule';

interface Props {
  events: Event[];
}

export function DashboardCalendar({ events }: Props) {
  return (
    <FullCalendar
      locale="pt-br"
      initialView="dayGridMonth"
      plugins={[dayGridPlugin]}
      headerToolbar={false}
      events={events.map((event) => ({
        title: event.title,
        start: event.start_date,
        end: event.final_date,
        color: event.color,
        backgroundColor: event.color,
        extendedProps: { ...event },
      }))}
    />
  );
}
