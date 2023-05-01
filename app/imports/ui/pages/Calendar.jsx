import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container } from 'react-bootstrap';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Sessions } from '../../api/session/Session';
import { Points } from '../../api/points/Points';
import { Profiles } from '../../api/profile/Profile';
import { Notes } from '../../api/note/Notes';
import StudySessionModal from '../components/StudySessionModal';
import LoadingSpinner from '../components/LoadingSpinner';

const Calendar = () => {
  const { ready, sessions, points, profiles, notes } = useTracker(() => {
    const subscription1 = Meteor.subscribe(Sessions.publicPublicationName);
    const subscription2 = Meteor.subscribe(Points.publicPublicationName);
    const subscription3 = Meteor.subscribe(Profiles.publicPublicationName);
    const subscription4 = Meteor.subscribe(Notes.userPublicationName);
    const rdy = subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();
    const sessionsItems = Sessions.collection.find({}).fetch();
    const pointsItems = Points.collection;
    const profilesItems = Profiles.collection.find({}).fetch();
    const noteItems = Notes.collection.find({}).fetch();
    return {
      sessions: sessionsItems,
      points: pointsItems,
      profiles: profilesItems,
      notes: noteItems,
      ready: rdy,
    };
  }, []);

  const sessionsToEvents = (studySessions) => studySessions.map((session) => ({
    groupId: session._id,
    title: `${session.icsclass} | ${session.name}`,
    date: session.date,
  }));

  const [modal, setModal] = useState({ show: false, session: null });
  const handleClose = () => setModal({ show: false, session: null });

  const displayStudySessionModal = (id) => {
    const studySession = sessions.find(session => session._id === id);
    setModal({ show: true, session: studySession });
  };

  return (ready ? (
    <Container id="calendar-page" className="my-4 py-3" style={{ backgroundColor: 'white' }}>
      { modal.show && (
        <StudySessionModal
          session={modal.session}
          points={points}
          profiles={profiles}
          notes={notes.filter(note => (note.sessionId === modal.session._id))}
          show={modal.show}
          handleClose={handleClose}
        />
      )}
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          end: 'today prev,next',
        }}
        events={sessionsToEvents(sessions)}
        eventDisplay="block"
        eventClick={(info) => {
          displayStudySessionModal(info.event.groupId);
        }}
      />
    </Container>
  ) : <LoadingSpinner />);
};

export default Calendar;
