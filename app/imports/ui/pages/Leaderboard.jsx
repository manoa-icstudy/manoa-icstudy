import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { Points } from '../../api/points/Points';
import LoadingSpinner from '../components/LoadingSpinner';
import PointsStuff from '../components/Points';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Leaderboard = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, user, currUser } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const nameSubscription = Meteor.subscribe(Points.publicPublicationName);
    // Determine if the subscription is ready
    const rdy = nameSubscription.ready();
    // Get the Stuff documents
    const name = Points.collection.find({}).fetch();
    const userData = Points.collection.findOne({ owner: currentUser });
    const currPoints = userData.pointCount;
    return {
      user: name,
      currUser: currPoints,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Leaderboard</h2>
            <h4>Your points: {currUser}</h4>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Points</th>
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <th>Remove</th>
                ) : ''}
              </tr>
            </thead>
            <tbody>
              {user.map((point) => <PointsStuff key={point._id} points={point} point={Points.collection} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Leaderboard;
