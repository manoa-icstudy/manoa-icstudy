import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, ListGroup, Container, Card, Col, Row, Image, Badge } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Link } from 'react-router-dom';
import { Person, PersonFill, PencilFill, X } from 'react-bootstrap-icons';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Profiles } from '../../../api/profile/Profile';
import LoadingSpinner from '../../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/* eslint-disable no-nested-ternary */
/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const { ready, profile } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const userProfile = Profiles.collection.find({ owner: currentUser }).fetch()[0];
    return {
      profile: userProfile,
      ready: rdy,
    };
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const submit = (data) => {
    const { firstName, lastName, email, picture, currentCourses, mentorCourses } = data;
    Profiles.collection.update(profile._id, { $set: { firstName, lastName, email, picture, currentCourses, mentorCourses } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      (swal('Success', 'Profile updated successfully', 'success'), setIsEditing(false))));
  };

  return (ready ? (
    <Container fluid id="user-home-page">
      <Row width="100%" className="py-2" style={{ backgroundColor: 'gray' }}>
        <Col className="m-3">
          <Container>
            <h1><PersonFill /> Manage Account</h1>
          </Container>
        </Col>
      </Row>
      <Container id="allUserHome" fluid className="mx-5">
        <Row className="my-4 justify-content-start">
          <Col md={2}>
            <ListGroup>
              <ListGroup.Item>
                <Link to="/user-home"><h5>Home</h5></Link>
              </ListGroup.Item>

              <ListGroup.Item>
                <div><h5>Study Session</h5></div>
                <div><Link to="/user-home-session" id="goto-user-home-session">- My study session</Link></div>
                <div><Link to="/user-home-join" id="goto-user-home-join">- My Joined session</Link></div>
                <div><Link to="/create-study-session" id="goto-create-study-session">- Create study session</Link></div>
              </ListGroup.Item>

              <ListGroup.Item>
                <div><h5>Schedule</h5></div>
                <div><Link to="/calendar">- Session calendar</Link></div>
              </ListGroup.Item>

              <ListGroup.Item>
                <div><h5>Contact</h5></div>
                <div><Link to="/create-feedback">- Feedback</Link></div>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={8}>
            <h3>My Profile</h3>
            <Row>
              <Col md={3}>
                <Card>
                  <Card.Body className="d-flex flex-column align-items-center">
                    { (!Object.hasOwn(profile, 'picture') || profile.picture.length === 0)
                      ? <Person size="lg" />
                      : <Image width="75%" className="m-3" roundedCircle src={profile.picture} />}
                    <h5>
                      <span>{profile.firstName}</span>
                      <span> {profile.lastName}</span>
                    </h5>
                    <Button id="edit-profile" onClick={() => setIsEditing(!isEditing)}>
                      { isEditing
                        ? <span><X />Cancel</span>
                        : <span><PencilFill /> Edit Profile</span> }
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <AutoForm schema={bridge} onSubmit={data => submit(data)} model={profile}>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col>
                          <b>First Name</b>
                        </Col>
                        <Col>
                          { isEditing
                            ? <TextField id="firstName-field" name="firstName" labelClassName="d-none" />
                            : <p id="firstName">{profile.firstName}</p> }
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b>Last Name</b>
                        </Col>
                        <Col>
                          { isEditing
                            ? <TextField id="lastName-field" name="lastName" labelClassName="d-none" />
                            : <p id="lastName">{profile.lastName}</p> }
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b>Email Address</b>
                        </Col>
                        <Col>
                          { isEditing
                            ? <TextField id="email-field" name="email" labelClassName="d-none" disabled />
                            : <p id="email">{profile.email}</p> }
                        </Col>
                      </Row>
                      { isEditing && (
                        <Row>
                          <Col>
                            <b>Picture URL</b>
                          </Col>
                          <Col>
                            <TextField id="picture-field" name="picture" labelClassName="d-none" />
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col>
                          <b>Current Courses</b>
                        </Col>
                        <Col>
                          <p>
                            { isEditing
                              ? <SelectField id="currentCourses-field" name="currentCourses" labelClassName="d-none" />
                              : (!Object.hasOwn(profile, 'currentCourses') || profile.currentCourses.length === 0)
                                ? <i>None</i>
                                : profile.currentCourses.map(course => <Badge className="me-1" id={course} key={course}>{course}</Badge>) }
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b>Mentor Courses</b>
                        </Col>
                        <Col>
                          <p>
                            { isEditing
                              ? <SelectField id="mentorCourses-field" name="mentorCourses" labelClassName="d-none" />
                              : (!Object.hasOwn(profile, 'mentorCourses') || profile.mentorCourses.length === 0)
                                ? <i>None</i>
                                : profile.mentorCourses.map(course => <Badge className="me-1" id={course} key={course}>{course}</Badge>) }
                          </p>
                        </Col>
                      </Row>
                      { isEditing && (<><ErrorsField /><SubmitField value="Submit" /></>)}
                    </Card.Body>
                  </Card>
                </AutoForm>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserHome;
