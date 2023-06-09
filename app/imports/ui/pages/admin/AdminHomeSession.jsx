import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ListGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PersonFillLock } from 'react-bootstrap-icons';
import { Sessions } from '../../../api/session/Session';
import AdminStudySession from '../../components/AdminStudySession';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Notes } from '../../../api/note/Notes';
import { Points } from '../../../api/points/Points';
import { Profiles } from '../../../api/profile/Profile';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const AdminHomeSession = () => {
  const { ready, sessions, num, notes, profiles } = useTracker(() => {
  // Note that this subscription will get cleaned up
  // when your component is unmounted or deps change.
  // Get access to Stuff documents.
    const subscription1 = Meteor.subscribe(Sessions.publicPublicationName);
    const subscription2 = Meteor.subscribe(Points.publicPublicationName);
    const subscription3 = Meteor.subscribe(Notes.userPublicationName);
    const subscription4 = Meteor.subscribe(Profiles.publicPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready();
    // Get the Stuff documents
    const stuffItems = Sessions.collection.find({}).fetch();
    const numSession = Sessions.collection.find({}).count();
    const noteItems = Notes.collection.find({}).fetch();
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      sessions: stuffItems,
      notes: noteItems,
      profiles: profileItems,
      num: numSession,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <>
      <Row className="py-2 m-0" style={{ backgroundColor: 'gray' }}>
        <Col className="m-3">
          <Container>
            <h1><PersonFillLock /> Admin Manage List</h1>
          </Container>
        </Col>
      </Row>
      <Container id="allUserHome" fluid className="h-100">
        <Row className="my-4 justify-content-start">
          <Col md="auto" className="position-fixed">
            <ListGroup>
              <ListGroup.Item>
                <Link to="/admin-home"><h5>Home</h5></Link>
              </ListGroup.Item>

              <ListGroup.Item>
                <div><h5>Study Session</h5></div>
                <div><Link to="/admin-home-session">- Manage study session</Link></div>
              </ListGroup.Item>

              <ListGroup.Item>
                <div><h5>Schedule</h5></div>
                <div><Link to="/calendar">- Manage Session calendar</Link></div>
              </ListGroup.Item>

              <ListGroup.Item>
                <div><h5>Support</h5></div>
                <div><Link to="/admin-home-feedback">- View Feedback</Link></div>
                <div><Link to="/admin-home-report">- View report</Link></div>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col style={{ marginLeft: '300px' }}>
            <Container className="py-3">
              <Row className="justify-content-center">
                <Row md={10}>
                  <Col className="text-center">
                    <h2>Session List</h2>
                    <h5>Status: {num} sessions available</h5>
                  </Col>
                  <Row xs={1} md={2} className="g-5">
                    {sessions.map((session) => (
                      <AdminStudySession
                        key={session._id}
                        session={session}
                        collection={Sessions.collection}
                        point={Points.collection}
                        notes={notes.filter(note => (note.sessionId === session._id))}
                        profiles={profiles}
                      />
                    ))}
                  </Row>
                </Row>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default AdminHomeSession;
