import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { Archive } from 'react-bootstrap-icons';
import swal from 'sweetalert';
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
    const userData = Points.collection.find({ owner: currentUser });
    const currPoints = userData.pointCount;
    console.log(currPoints);
    return {
      user: name,
      currUser: currPoints,
      ready: rdy,
    };
  }, []);

  const redeem = () => {
    const userData = Points.collection.findOne({ owner: currentUser });
    swal({
      title: 'Redeem a reward?',
      text: 'These can be redeemed at the UH Manoa bookstore',
      icon: 'warning',
      buttons: {
        cancel: true,
        gift_card: {
          text: '$10 voucher (5)',
          value: 'gift_card',
        },
        item: {
          text: 'Free item under $25 (10)',
          value: 'item',
        },
      },
    })
      .then((value) => {
        switch (value) {

        case 'gift_card':
          swal({
            title: 'Redeem a $10 voucher for 5 points?',
            text: 'This will cost 5 points and can be redeemed at the Manoa bookstore',
            icon: 'warning',
            buttons: true,
          })
            .then((clicked) => {
              if (clicked) {
                if (userData.pointCount >= 5) {
                  Points.collection.update(userData._id, { $inc: { pointCount: -5 } });
                  swal('Success', 'Head to the bookstore to redeem your reward', 'success');
                } else {
                  swal('Error', 'You must have at least 5 points to redeem this', 'error');
                }
              } else {
                // Transaction cancelled
              }
            });
          break;
        case 'item':
          swal({
            title: 'Redeem a free item under $25 for 10 points?',
            text: 'This will cost 10 points and can be redeemed at the Manoa bookstore',
            icon: 'warning',
            buttons: true,
          })
            .then((clicked) => {
              if (clicked) {
                if (userData.pointCount >= 10) {
                  Points.collection.update(userData._id, { $inc: { pointCount: -10 } });
                  swal('Success', 'Head to the bookstore to redeem your reward', 'success');
                } else {
                  swal('Error', 'You must have at least 10 points to redeem this', 'error');
                }
              } else {
                // Transaction cancelled
              }
            });
          break;
        default:

        }
      });
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Leaderboard</h2>
            <h4>Your points: {currUser} <Button variant="info" onClick={() => redeem()}><Archive /></Button></h4>
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
