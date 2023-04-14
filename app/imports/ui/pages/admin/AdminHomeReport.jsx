import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ListGroup, Container, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PersonFillLock } from 'react-bootstrap-icons';
import { Reports } from '../../../api/report/Report';
import Report from '../../components/Report';
import LoadingSpinner from '../../components/LoadingSpinner';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => {
  const { ready, reports } = useTracker(() => {
  // Note that this subscription will get cleaned up
  // when your component is unmounted or deps change.
  // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Reports.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Reports.collection.find({}).fetch();
    return {
      reports: stuffItems,
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
      <Container id="allUserHome">
        <Row className="mt-4">
          <Col md={3}>
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

          <Col>
            <Container className="py-3">
              <Row className="justify-content-center">
                <Col md={10}>
                  <Col className="text-center">
                    <h2>Report List</h2>
                  </Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Reported User</th>
                        <th>Description</th>
                        <th>Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => <Report key={report._id} report={report} />)}
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

export default UserHome;
