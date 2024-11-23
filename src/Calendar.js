import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

function Calendar({ clubId }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch meetings from the backend
        axios.get(`/api/clubs/meetings/${clubId}`)
            .then(response => {
                const fetchedEvents = response.data.map(meeting => ({
                    id: meeting.id,
                    title: meeting.event_name,
                    start: meeting.meeting_time,
                }));
                setEvents(fetchedEvents);
            })
            .catch(error => console.error('Error fetching meetings:', error));
    }, [clubId]);

    const handleDateClick = (arg) => {
        const eventName = prompt('Enter the event title:');
        if (eventName) {
            const newEvent = { title: eventName, start: arg.dateStr };

            // Send the event to the backend
            axios.post('/api/clubs/schedule-meeting', {
                clubId,
                eventName,
                meetingTime: arg.dateStr,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            })
            .then(() => {
                setEvents([...events, newEvent]);
                alert('Meeting scheduled successfully');
            })
            .catch(error => {
                console.error('Error scheduling meeting:', error);
                alert('Failed to schedule meeting. Please try again.');
            });
        }
    };

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
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
