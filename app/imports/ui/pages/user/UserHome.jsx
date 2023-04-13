import React from 'react';
import { ListGroup, Container, Nav, Col, Row } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => (
  <Container className="m-5">
    <Container className="m-5" style={{ backgroundColor: 'gray' }}><h1>Account</h1></Container>
    <Container>
      <Row>
        <Col md={2}>
          <Container>
            <ListGroup>
              <ListGroup.Item><Nav.Link>xxx</Nav.Link></ListGroup.Item>
              <ListGroup.Item><Nav.Link>xxx</Nav.Link></ListGroup.Item>
              <ListGroup.Item><Nav.Link>xxx</Nav.Link></ListGroup.Item>
              <ListGroup.Item><Nav.Link>xxx</Nav.Link></ListGroup.Item>
              <ListGroup.Item><Nav.Link>xxx</Nav.Link></ListGroup.Item>
              <ListGroup.Item><Nav.Link>xxx</Nav.Link></ListGroup.Item>
              <ListGroup.Item><Nav.Link>xxx</Nav.Link></ListGroup.Item>
              <ListGroup.Item><Nav.Link>xxx</Nav.Link></ListGroup.Item>
            </ListGroup>
          </Container>
        </Col>

        <Col>
          <p>test</p>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default UserHome;
