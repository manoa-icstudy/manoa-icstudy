import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, SelectField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Profiles } from '../../api/profile/Profile';
import { LoginLog } from '../../api/log/LoginLog';
import { icsCourses } from '../../api/course/courses';
import { Points } from '../../api/points/Points';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    picture: { type: String, label: 'Picture URL', optional: true },
    currentCourses: { type: Array, optional: true },
    'currentCourses.$': {
      type: String,
      allowedValues: icsCourses,
    },
    mentorCourses: { type: Array, optional: true },
    'mentorCourses.$': {
      type: String,
      allowedValues: icsCourses,
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { firstName, lastName, email, password, picture, currentCourses, mentorCourses } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });

    const date = new Date();
    const owner = email;
    LoginLog.insert({ owner, date });
    const pointCount = 0;
    Points.collection.insert({ owner, pointCount });
    Profiles.collection.insert(
      { firstName, lastName, email, picture, currentCourses, mentorCourses, owner: email },
      (err) => {
        if (err) {
          swal('Error', error.message, 'error');
        }
      },
    );
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/study-session-list' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <TextField name="firstName" placeholder="First name" />
                  </Col>
                  <Col>
                    <TextField name="lastName" placeholder="Last name" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField name="email" placeholder="Email address" />
                  </Col>
                  <Col>
                    <TextField name="password" placeholder="Password" type="password" />
                  </Col>
                </Row>
                <TextField name="picture" placeholder="URL to profile picture" />
                <Row>
                  <Col>
                    <SelectField
                      name="currentCourses"
                      help="Select the courses you are currently taking (optional)"
                      showInlineError
                    />
                  </Col>
                  <Col>
                    <SelectField
                      name="mentorCourses"
                      help="Select the courses you are willing to provide help in (optional)"
                      showInlineError
                    />
                  </Col>
                </Row>
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
