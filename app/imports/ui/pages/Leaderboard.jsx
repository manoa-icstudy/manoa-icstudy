import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Points } from '../../api/points/Points';
import LoadingSpinner from '../components/LoadingSpinner';
import PointsStuff from '../components/Points';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Leaderboard = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, points } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Points.publicPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Points.collection.find({}).fetch();
    return {
      points: stuffItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Leaderboard</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Redeem</th>
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <th>Remove</th>
                ) : ''}
              </tr>
            </thead>
            <tbody>
              {points.map((point) => <PointsStuff key={points._id} point={point} collection={Points.collection} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Leaderboard;
