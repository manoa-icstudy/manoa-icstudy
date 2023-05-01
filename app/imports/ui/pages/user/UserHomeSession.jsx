import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ListGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PersonFill } from 'react-bootstrap-icons';
import { Sessions } from '../../../api/session/Session';
import UserStudySession from '../../components/UserStudySession';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Notes } from '../../../api/note/Notes';
import { Points } from '../../../api/points/Points';
import { Profiles } from '../../../api/profile/Profile';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHomeSession = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, sessions, notes, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get  access to Stuff documents.
    const subscription1 = Meteor.subscribe(Sessions.userPublicationName);
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
    <>
      <Row className="py-2 m-0" style={{ backgroundColor: 'gray' }}>
        <Col className="m-3">
          <Container>
            <h1><PersonFill /> Manage Account</h1>
          </Container>
        </Col>
      </Row>
      <Container fluid>
        <Container id="allUserHome" fluid className="vh-100">
          <Row className="my-4 justify-content-start">
            <Col md="auto" className="position-fixed">
              <ListGroup>
                <ListGroup.Item>
                  <Link to="/user-home"><h5>Home</h5></Link>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div><h5>Study Session</h5></div>
                  <div><Link to="/user-home-session" id="goto-user-home-session">- My study session</Link></div>
                  <div><Link to="/user-home-join" id="goto-user-home-join">- My Joined session</Link></div>
                  <div><Link to="/create-study-session" id="goto-create-study-session">- Create study session</Link></div>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div><h5>Schedule</h5></div>
                  <div><Link to="/calendar">- Session calendar</Link></div>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div><h5>Contact</h5></div>
                  <div><Link to="/create-feedback">- Feedback</Link></div>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col style={{ marginLeft: '300px' }}>
              <Container className="py-3">
                <Row className="justify-content-center">
                  <Row md={10}>
                    <Col className="text-center">
                      <h2>My Session List</h2>
                    </Col>
                    <Row xs={1} md={2} className="g-5">
                      {sessions.map((session) => (
                        <UserStudySession
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
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default UserHomeSession;
