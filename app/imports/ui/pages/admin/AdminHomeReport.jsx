import React from 'react';
import { Meteor } from 'meteor/meteor';
import { ListGroup, Container, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PersonFillLock } from 'react-bootstrap-icons';
import ListReportDate from '../../components/ListReportDate';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ReportDate } from '../../../api/date/ReportDate';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */

const AdminHomeReport = () => {
  const { ready, reports, num } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const reportSubscription = Meteor.subscribe('ReportCollection');
    const dateSubscription = Meteor.subscribe('ReportDateData');
    // Determine if the subscription is ready
    const rdy = reportSubscription.ready() && dateSubscription.ready();
    // Get the Stuff documents
    const dateItems = ReportDate.find().fetch();
    const numReport = ReportDate.find().count();

    return {
      reports: dateItems,
      num: numReport,
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
                    <h5>Status: {num} reports available</h5>
                  </Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Owner</th>
                        <th>Name</th>
                        <th>Reported User</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => <ListReportDate key={report._id} reportDate={report} collection={ReportDate} />)}
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

export default AdminHomeReport;

// {test.map((tes) => <ListReport key={tes.date} report={tes} />)}
// {reports.map((report) => <ListReport key={report._id} report={report} />)}
