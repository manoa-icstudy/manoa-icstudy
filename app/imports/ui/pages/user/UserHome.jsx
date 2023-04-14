import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ListGroup, Container, Col, Row, Table, Image, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Profiles } from '../../../api/profile/Profile';
import LoadingSpinner from '../../components/LoadingSpinner';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const UserHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
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

  return (ready ? (
    <>
      <Row className="py-2" style={{ backgroundColor: 'gray' }}>
        <Col className="m-3">
          <Container>
            <h1>Manage Account</h1>
          </Container>
        </Col>
      </Row>
      <Container id="allUserHome">
        <Row className="mt-4">
          <Col md={2}>
            <ListGroup>
              <ListGroup.Item>
                <Link to="/user-home"><h5>Home</h5></Link>
              </ListGroup.Item>

              <ListGroup.Item>
                <div><h5>Study Session</h5></div>
                <div><Link to="/user-home-session">- My study session</Link></div>
                <div><Link to="/createstudysession">- Create study session</Link></div>
              </ListGroup.Item>

              <ListGroup.Item>
                <div><h5>Schedule</h5></div>
                <div><Link to="/calendar">- Session calendar</Link></div>
              </ListGroup.Item>

              <ListGroup.Item>
                <div><h5>Contact</h5></div>
                <div><Link to="/createfeedback">- Feedback</Link></div>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={6}>
            <h3>My Profile</h3>
            <Image src="/images/meteor-logo.png" className="m-3" />
            <Table bordered hover>
              <tbody>
                <tr>
                  <th className="w-25">First Name</th>
                  <td>{profile.firstName}</td>
                  <th className="w-25">Last Name</th>
                  <td>{profile.lastName}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td colSpan={3}>{profile.email}</td>
                </tr>
                <tr>
                  <th>Current Courses</th>
                  <td colSpan={3}>
                    {Object.hasOwn(profile, 'currentCourses')
                      ? profile.currentCourses.map(course => <Badge className="mx-1" key={course}>{course}</Badge>)
                      : <i>None</i>}
                  </td>
                </tr>
                <tr>
                  <th>Mentor Courses</th>
                  <td colSpan={3}>
                    {Object.hasOwn(profile, 'mentorCourses')
                      ? profile.mentorCourses.map(course => <Badge className="mx-1" key={course}>{course}</Badge>)
                      : <i>None</i>}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default UserHome;
