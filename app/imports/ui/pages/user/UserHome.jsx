import React from 'react';
import { ListGroup, Container, Nav, Col, Row } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => (
  <Container fluid>
    <Row style={{ backgroundColor: 'gray' }}><Col className="m-3"><h1 className="mx-5">Manage Account</h1></Col></Row>
    <Row className="m-5">
      <Col md={2}>
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
      </Col>

      <Col>
        <p>test</p>
      </Col>
    </Row>
  </Container>
);

export default UserHome;
