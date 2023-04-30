import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ListGroup, Container, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PersonFillLock } from 'react-bootstrap-icons';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Feedbacks } from '../../../api/feedback/Feedback';
import FeedBacks from '../../components/FeedBacks';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const AdminHomeFeedback = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, feedbacks, num } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Feedbacks.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Feedbacks.collection.find({}).fetch();
    const numFeedback = Feedbacks.collection.find({}).count();
    return {
      feedbacks: stuffItems,
      num: numFeedback,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <>
      <Row className="py-2 m-0" style={{ backgroundColor: 'gray' }}>
        <Col className="m-3">
          <Container>
            <h1><PersonFillLock /> Admin Manage List</h1>
          </Container>
        </Col>
      </Row>
      <Container id="allUserHome" fluid className="vh-100">
        <Row className="my-4 justify-content-start">
          <Col md="auto" className="position-fixed">
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

          <Col style={{ marginLeft: '300px' }}>
            <Container className="py-3">
              <Row className="justify-content-center">
                <Col md={10}>
                  <Col className="text-center">
                    <h2>Feedback List</h2>
                    <h5>Status: {num} feedbacks available</h5>
                  </Col>
                  <Table striped bordered hover style={{ backgroundColor: 'white' }}>
                    <thead>
                      <tr>
                        <th>Experience</th>
                        <th>Feedback of</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.map((feedback) => <FeedBacks key={feedback._id} feedback={feedback} />)}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default AdminHomeFeedback;
