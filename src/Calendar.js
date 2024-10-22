// Calendar.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dateClick

function Calendar() {
  const [events, setEvents] = useState([
    { title: 'All Day Event', start: new Date() },
    { title: 'Meeting', start: new Date(Date.now() + 3600 * 1000 * 3), end: new Date(Date.now() + 3600 * 1000 * 4) },
    // Add more events here
  ]);

  const handleDateClick = (arg) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([...events, { title, start: arg.date, allDay: arg.allDay }]);
    }
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        dateClick={handleDateClick}
        droppable={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
      />
    </div>
  );
}

export default Calendar;
