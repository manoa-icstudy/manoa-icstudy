import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ListGroup, Container, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Sessions } from '../../../api/session/Session';
import StudySession from '../../components/StudySession';
import LoadingSpinner from '../../components/LoadingSpinner';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => {
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
    <Container id="allUserHome" fluid>
      <Row style={{ backgroundColor: 'gray' }}><Col className="m-3"><Link to="/user-home"><h1 className="mx-5">Manage Account</h1></Link></Col></Row>
      <Row className="m-5">
        <Col md={2}>
          <ListGroup>
            <ListGroup.Item>
              <Link to="/user-home"><h5>Home</h5></Link>
            </ListGroup.Item>

            <ListGroup.Item>
              <div><h5>Study Session</h5></div>
              <div><Link to="/user-home-session">- My study session</Link></div>
              <div><Link to="/createstudysession">- Create study session</Link></div>
            </ListGroup.Item>

            <ListGroup.Item>
              <div><h5>Schedule</h5></div>
              <div><Link to="/calendar">- Session calendar</Link></div>
            </ListGroup.Item>

            <ListGroup.Item>
              <div><h5>Contact</h5></div>
              <div><Link to="/createfeedback">- Feedback</Link></div>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col>
          <Container className="py-3">
            <Row className="justify-content-center">
              <Col md={10}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>ICS Class</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session) => <StudySession key={session._id} session={session} />)}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserHome;
