import React from 'react';
import { Col, Row, Container, Nav, Form, Button, Image } from 'react-bootstrap';
import { Discord, Github, Link45deg, Linkedin, Share } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container className="p-3" style={{ borderBottom: 'solid', borderColor: 'lightgray' }}>
      <Row>
        <Col>
          <h5>Support</h5>
          <hr />
          <Nav.Link><h6>Team</h6></Nav.Link>
          <Nav.Link><h6>Link</h6></Nav.Link>
          <Nav.Link><h6>Link</h6></Nav.Link>
        </Col>

        <Col>
          <h5>UH MANOA</h5>
          <hr />
          <Nav.Link href="https://manoa.hawaii.edu/"><h6>UH Mānoa</h6></Nav.Link>
          <Nav.Link href="http://natsci.manoa.hawaii.edu/"><h6>College of Natural Sciences</h6></Nav.Link>
          <Nav.Link href="https://manoa.hawaii.edu/about/visit/"><h6>Visit UH Mānoa</h6></Nav.Link>
          <Nav.Link href="https://manoa.hawaii.edu/directory/"><h6>Campus Directory</h6></Nav.Link>
          <Nav.Link href="https://myuh.hawaii.edu/"><h6>MyUH</h6></Nav.Link>
        </Col>

        <Col>
          <h5>ICS Department</h5>
          <hr />
          <Nav.Link href="https://www.ics.hawaii.edu/"><h6>ICS Home</h6></Nav.Link>
          <Nav.Link href="https://www.ics.hawaii.edu/about/"><h6>About ICS</h6></Nav.Link>
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
        Copyright © 2023 Information and Computer Sciences – Powered by
        <br />
        <a href="http://ics-software-engineering.github.io/meteor-application-template-react">
          Ics software engineering
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
