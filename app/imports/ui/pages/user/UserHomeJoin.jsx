import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ListGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PersonFill } from 'react-bootstrap-icons';
import { Sessions } from '../../../api/session/Session';
import LoadingSpinner from '../../components/LoadingSpinner';
import StudySession from '../../components/StudySession';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHomeJoin = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const { ready, sessions } = useTracker(() => {
  // Note that this subscription will get cleaned up
  // when your component is unmounted or deps change.
  // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Sessions.publicPublicationName);
    console.log(subscription);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Sessions.collection.find({ participant: currentUser }).fetch();
    return {
      sessions: stuffItems,
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
                      <h2>My Joined List</h2>
                    </Col>
                    <Row xs={1} md={2} className="g-5">
                      {sessions.map((session) => <StudySession key={session._id} session={session} />)}
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

export default UserHomeJoin;
