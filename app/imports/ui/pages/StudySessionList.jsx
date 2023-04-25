import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/session/Session';
import StudySession from '../components/StudySession';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudySessionList = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, sessions } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Sessions.publicPublicationName);
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
    <Container className="py-3" id="study-session-list">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Study Sessions</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>ICS Class</th>
                <th>Description</th>
                <th>Date</th>
                <th>Join Session</th>
                <th>Report Session</th>
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <th>Remove</th>
                ) : ''}
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => <StudySession key={session._id} session={session} collection={Sessions.collection} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudySessionList;
