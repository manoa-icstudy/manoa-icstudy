import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Plus } from 'react-bootstrap-icons';
import { Sessions } from '../../api/session/Session';
import StudySession from '../components/StudySession';
import LoadingSpinner from '../components/LoadingSpinner';
import { Points } from '../../api/points/Points';
import { Notes } from '../../api/note/Notes';
import { Profiles } from '../../api/profile/Profile';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudySessionList = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, sessions, notes, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get  access to Stuff documents.
    const subscription1 = Meteor.subscribe(Sessions.publicPublicationName);
    const subscription2 = Meteor.subscribe(Points.publicPublicationName);
    const subscription3 = Meteor.subscribe(Notes.userPublicationName);
    const subscription4 = Meteor.subscribe(Profiles.publicPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();
    // Get the Stuff documents
    const stuffItems = Sessions.collection.find({}).fetch();
    const noteItems = Notes.collection.find({}).fetch();
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      sessions: stuffItems,
      notes: noteItems,
      profiles: profileItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3" id="study-session-list">
      <Row className="justify-content-center">
        <Row md={10}>
          <Col className="text-center">
            <h2>Study Sessions</h2>
            <Button id="create-study-session" href="/create-study-session" variant="dark"><Plus className="my-1 me-1" size={30} />Create Study Session</Button>
          </Col>
          <Row xs={1} md={2} className="g-5">
            {sessions.map((session) => <StudySession key={session._id} session={session} collection={Sessions.collection} point={Points.collection} notes={notes.filter(note => (note.sessionId === session._id))} profiles={profiles} />)}
          </Row>
        </Row>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudySessionList;
