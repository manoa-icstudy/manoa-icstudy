import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Navbar, Container, Nav, NavDropdown, Row } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonFillLock, PersonPlusFill } from 'react-bootstrap-icons';

const TopNavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="justify-content-end">
        <Row>
          <Nav>
            {!currentUser ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : ''}

            {currentUser ? ([
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-current-user-profile" as={NavLink} to="/user-home">
                  <PersonFill />
                  {' '}
                  Profile
                </NavDropdown.Item>

                {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/admin-home">
                    <PersonFillLock />
                    Admin
                  </NavDropdown.Item>
                ) : ''}

                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>,
            ]) : ''}
          </Nav>
        </Row>
      </Container>
    </Navbar>
  );
};

export default TopNavBar;
