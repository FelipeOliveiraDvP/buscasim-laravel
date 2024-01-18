import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Event, EventListQuery } from "@/core/services/schedule";

interface Props {
  events: Event[];
  onChange: (dates: EventListQuery) => void;
  onSelect: (event?: Event) => void;
}

export function Schedule({ events, onChange, onSelect }: Props) {
  return (
    <FullCalendar
      locale="pt-br"
      initialView="dayGridMonth"
      plugins={[dayGridPlugin]}
      selectable
      buttonText={{
        today: "Hoje",
      }}
      events={events.map((event) => ({
        title: event.title,
        start: event.start_date,
        end: event.final_date,
        color: event.color,
        backgroundColor: event.color,
        extendedProps: { ...event },
      }))}
      eventClick={({ event }) => onSelect(event.extendedProps as Event)}
      datesSet={(arg) =>
        onChange({
          start_date: arg.startStr,
          final_date: arg.endStr,
        })
      }
    />
  );
}
