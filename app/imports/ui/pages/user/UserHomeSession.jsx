import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ListGroup, Container, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PersonFill } from 'react-bootstrap-icons';
import { Sessions } from '../../../api/session/Session';
import UserStudySession from '../../components/UserStudySession';
import LoadingSpinner from '../../components/LoadingSpinner';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHomeSession = () => {
  const { ready, sessions } = useTracker(() => {
  // Note that this subscription will get cleaned up
  // when your component is unmounted or deps change.
  // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Sessions.collection.find({}).fetch();
    return {
      sessions: stuffItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <>
      <Row className="py-2" style={{ backgroundColor: 'gray' }}>
        <Col className="m-3">
          <Container>
            <h1><PersonFill /> Manage Account</h1>
          </Container>
        </Col>
      </Row>
      <Container fluid>
        <Container id="allUserHome">
          <Row className="mt-4">
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Link to="/user-home"><h5>Home</h5></Link>
                </ListGroup.Item>

                <ListGroup.Item>
                  <div><h5>Study Session</h5></div>
                  <div><Link to="/user-home-session">- My study session</Link></div>
                  <div><Link to="/user-home-join">- My Joined session</Link></div>
                  <div><Link to="/create-study-session">- Create study session</Link></div>
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

            <Col>
              <Container className="py-3">
                <Row className="justify-content-center">
                  <Col md={11}>
                    <Col className="text-center">
                      <h2>Session List</h2>
                    </Col>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>ICS Class</th>
                          <th>Description</th>
                          <th>Date</th>
                          <th>Join Session</th>
                          <th>Report</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessions.map((session) => <UserStudySession key={session._id} session={session} collection={Sessions.collection} />)}
                      </tbody>
                    </Table>
                  </Col>
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
