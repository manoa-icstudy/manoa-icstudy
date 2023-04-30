import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  swal('You are signed out');

  const { from } = { from: { pathname: '/home' } };

  return (
    <Navigate to={from} />
  );
};

export default SignOut;
