import React from 'react';
import { Col, Row, Container, Nav, Form, Button } from 'react-bootstrap';
import { Discord, Github, Instagram, Link45deg, Linkedin, Share } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container className="p-3" style={{ borderBottom: 'solid', borderColor: 'lightgray' }}>
      <Row>
        <Col>
          <h5>Support</h5>
          <hr />
          <Nav.Link><h6>Link</h6></Nav.Link>
          <Nav.Link><h6>Link</h6></Nav.Link>
          <Nav.Link><h6>Link</h6></Nav.Link>
        </Col>

        <Col>
          <h5>Forum</h5>
          <hr />
          <Nav.Link><h6>Link</h6></Nav.Link>
          <Nav.Link><h6>Link</h6></Nav.Link>
          <Nav.Link><h6>Link</h6></Nav.Link>
        </Col>

        <Col>
          <h5>ICS Department</h5>
          <hr />
          <Nav.Link><h6>Link</h6></Nav.Link>
          <Nav.Link><h6>Link</h6></Nav.Link>
          <Nav.Link><h6>Link</h6></Nav.Link>
        </Col>

        <Col>
          <h5>Newsletter</h5>
          <hr />
          <h6>Sign up with your email to join our mailing list.</h6>
          <br />
          <Form className="mb-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </Form>

          <Row>
            <Col md={1}><Nav.Link><Github /></Nav.Link></Col>
            <Col md={1}><Nav.Link><Linkedin /></Nav.Link></Col>
            <Col md={1}><Nav.Link><Discord /></Nav.Link></Col>
            <Col md={1}><Nav.Link><Share /></Nav.Link></Col>
            <Col md={1}><Nav.Link><Link45deg /></Nav.Link></Col>
          </Row>
        </Col>
      </Row>
    </Container>

    <Container className="p-3">
      <Col className="text-center">
        Department of Information and Computer Sciences
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        <a href="http://ics-software-engineering.github.io/meteor-application-template-react">
          Template Home
          Page
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
