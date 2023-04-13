import React from 'react';
import { Container } from 'react-bootstrap';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => (
  <Container className="my-4">
    <Fullcalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        start: 'dayGridMonth,timeGridWeek,timeGridDay',
        center: 'title',
        end: 'today prev,next',
      }}
    />
  </Container>
);

export default Calendar;
