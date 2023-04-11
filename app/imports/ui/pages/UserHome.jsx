import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => {
  Meteor.logout();
  return (
    <Container>
      <p> usesr home</p>
    </Container>
  );
};

export default UserHome;
