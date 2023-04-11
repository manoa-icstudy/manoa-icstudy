import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, Row } from 'react-bootstrap';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Nav>
          <Navbar.Brand as={NavLink} to="/">
            <Nav>
              <Nav.Link><Image src="/images/logo.png" width={100} /></Nav.Link>
              <Container className="mt-4 pt-2"><h2>Manoa ICStudy</h2></Container>
            </Nav>
          </Navbar.Brand>
        </Nav>

        <Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Row>
              <Nav className="me-auto justify-content-start">
                {currentUser ? ([
                  <Nav.Link id="add-stuff-nav" as={NavLink} to="/add" key="add"><h5>Add Stuff</h5></Nav.Link>,
                  <Nav.Link id="list-stuff-nav" as={NavLink} to="/list" key="list"><h5>List Stuff</h5></Nav.Link>,
                ]) : ''}
                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin"><h5>Admin</h5></Nav.Link>
                ) : ''}
                {!currentUser ? ([
                  <Nav.Link id="guide-nav" as={NavLink} to="/guide" key="add"><h5>Feature Guide</h5></Nav.Link>,
                  <Nav.Link id="about-us-nav" as={NavLink} to="/about" key="list"><h5>About Us</h5></Nav.Link>,
                ]) : ''}
              </Nav>
            </Row>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
