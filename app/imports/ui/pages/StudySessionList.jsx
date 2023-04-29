import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/session/Session';
import StudySession from '../components/StudySession';
import LoadingSpinner from '../components/LoadingSpinner';
import { Points } from '../../api/points/Points';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudySessionList = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, sessions } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get  access to Stuff documents.
    const subscription = Meteor.subscribe(Sessions.publicPublicationName);
    const pointSubscription = Meteor.subscribe(Points.publicPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && pointSubscription.ready();
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
        <Row md={10}>
          <Col className="text-center">
            <h2>Study Sessions</h2>
          </Col>
          <Row xs={1} md={2} className="g-5">
            {sessions.map((session) => <StudySession key={session._id} session={session} collection={Sessions.collection} point={Points.collection} />)}
          </Row>
        </Row>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudySessionList;
