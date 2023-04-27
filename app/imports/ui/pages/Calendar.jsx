import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container } from 'react-bootstrap';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Sessions } from '../../api/session/Session';
import LoadingSpinner from '../components/LoadingSpinner';

const Calendar = () => {
  const { ready, sessions } = useTracker(() => {
    const subscription = Meteor.subscribe(Sessions.publicPublicationName);
    const rdy = subscription.ready();
    const sessionsItems = Sessions.collection.find({}).fetch();
    return {
      sessions: sessionsItems,
      ready: rdy,
    };
  }, []);

  const sessionsToEvents = (studySessions) => {
    const events = studySessions.map((session) => ({
      title: `[${session.icsclass}] ${session.name}`,
      date: session.date,
      description: session.description,
    }));
    return events;
  };

  return (ready ? (
    <Container id="calendar-page" className="my-4">
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          end: 'today prev,next',
        }}
        events={sessionsToEvents(sessions)}
      />
    </Container>
  ) : <LoadingSpinner />);
};

export default Calendar;
