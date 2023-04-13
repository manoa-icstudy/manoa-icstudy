import React from 'react';
import { ListGroup, Container, Col, Row, Table, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => (
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

      <Col md={5}>
        <h3>My Profile</h3>
        <Image src="/images/meteor-logo.png" className="m-3" />
        <Table bordered hover>
          <tbody>
            <tr>
              <th>user first name</th>
              <td>Alexander</td>
              <th>user first name</th>
              <td>Hung</td>
            </tr>
            <tr>
              <th>username</th>
              <td colSpan={3}>hungalex</td>
            </tr>
            <tr>
              <th>email</th>
              <td colSpan={3}>hungalex@hawaii.edu</td>
            </tr>
            <tr>
              <th>Course</th>
              <td>ics 314</td>
              <td colSpan={2}><Link to="/home">show all</Link></td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  </Container>
);

export default UserHome;
