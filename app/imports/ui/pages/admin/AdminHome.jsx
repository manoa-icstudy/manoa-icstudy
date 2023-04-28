import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ListGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PersonFillLock } from 'react-bootstrap-icons';
import { Profiles } from '../../../api/profile/Profile';
import LoadingSpinner from '../../components/LoadingSpinner';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const { ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const userProfile = Profiles.collection.find({ owner: currentUser }).fetch()[0];
    return {
      profile: userProfile,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <>
      <Row className="py-2" style={{ backgroundColor: 'gray' }}>
        <Col className="m-3">
          <Container>
            <h1><PersonFillLock /> Admin Manage List</h1>
          </Container>
        </Col>
      </Row>
      <Container id="allUserHome" fluid className="mx-5">
        <Row className="my-4 justify-content-start">
          <Col md={2}>
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

          <Col md={6}>
            <h2>Admin Home Page</h2>
            <h4>Description</h4>
            <p>xxx</p>
            <h4>Guide</h4>
            <p>xxx</p>
          </Col>
        </Row>
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default UserHome;
