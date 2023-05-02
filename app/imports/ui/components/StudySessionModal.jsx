import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Button, Modal, ListGroup, Card, Tab, Tabs, Row, Col } from 'react-bootstrap';
import { Calendar2, GeoAltFill, InfoCircle, PeopleFill } from 'react-bootstrap-icons';
import { Sessions } from '../../api/session/Session';
import ParticipantProfile from './ParticipantProfile';
import Note from './Note';
import { Notes } from '../../api/note/Notes';
import AddNote from '../pages/AddNote';

const StudySessionModal = ({ session, points, profiles, notes, show, handleClose }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const currentUserJoinStatus = () => {
    if (session.owner === currentUser) {
      return 'Owner';
    }
    if (session.participant.find(participant => participant === currentUser)) {
      return 'Leave';
    }
    return 'Join';
  };
  const [joinButtonName, setJoinButtonName] = useState(currentUserJoinStatus());

  const joinStudySession = (studySession, pointsCollection) => {
    if (!(studySession.participant.find(user => user === currentUser))) {
      // Add 1 point
      const data = pointsCollection.findOne({ owner: currentUser });
      pointsCollection.update(data._id, { $inc: { pointCount: 1 } });

      // Join Study Session
      studySession.participant.push(currentUser);
      const newParticipant = studySession.participant;
      Sessions.collection.update(studySession._id, { $set: { participant: newParticipant } });

      // Change button state
      setJoinButtonName('Leave');
    } else if ((studySession.participant.find(user => user === currentUser)) && (currentUser !== studySession.owner)) {
      // Subtract 1 point
      const data = pointsCollection.findOne({ owner: currentUser });
      pointsCollection.update(data._id, { $inc: { pointCount: -1 } });

      // Leave Study Session
      const index = studySession.participant.indexOf(currentUser);
      if (index > -1) {
        studySession.participant.splice(index, 1);
      }
      const newParticipant = studySession.participant;
      Sessions.collection.update(studySession._id, { $set: { participant: newParticipant } });

      // Change button state
      setJoinButtonName('Join');
    }
  };

  const participantIsMentor = (participant) => {
    const participantProfile = profiles.find(profile => profile.owner === participant);
    if (!Object.hasOwn(participantProfile, 'mentorCourses')) {
      return false;
    }
    return participantProfile.mentorCourses.includes(session.icsclass);
  };

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false} id="sessionModal">
      <Modal.Header closeButton>
        <Modal.Title>{session.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs>
          <Tab eventKey="info" title="Info">
            <ListGroup className="mt-3">
              <ListGroup.Item><PeopleFill className="mx-1" /><Card.Text className="d-inline-block">{session.icsclass}</Card.Text></ListGroup.Item>
              <ListGroup.Item><GeoAltFill className="mx-1" /><Card.Text className="d-inline-block">{session.location}</Card.Text></ListGroup.Item>
              <ListGroup.Item><Calendar2 className="mx-1" /><Card.Text className="d-inline-block">{new Intl.DateTimeFormat('en-US', options).format(session.date)}</Card.Text></ListGroup.Item>
              <ListGroup.Item><InfoCircle className="mx-1" /><Card.Text className="d-inline-block">{session.description}</Card.Text></ListGroup.Item>
            </ListGroup>
          </Tab>

          <Tab eventKey="participants" title="Participants">
            <br />
            <Row>
              <Col>
                <b>Mentors</b>
                <ul>
                  {session.participant.filter(participant => participantIsMentor(participant, profiles)).map(participant => (
                    <li key={participant}>
                      <ParticipantProfile profiles={profiles} participant={participant} />
                    </li>
                  ))}
                </ul>
              </Col>
              <Col>
                <b>Students</b>
                <ul>
                  {session.participant.filter(participant => !participantIsMentor(participant, profiles)).map(participant => (
                    <li key={participant}>
                      <ParticipantProfile profiles={profiles} participant={participant} />
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="chat" title="Chat">
            <br />
            <ListGroup>
              {notes.map((note) => <Note key={note._id} note={note} collection={Notes.collection} />)}
            </ListGroup>
            <AddNote owner={currentUser} sessionId={session._id} />
          </Tab>

        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button id={session._id} onClick={() => joinStudySession(session, points)} variant="outline-success">{joinButtonName}</Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

StudySessionModal.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    owner: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    icsclass: PropTypes.string,
    description: PropTypes.string,
    participant: PropTypes.arrayOf(String),
    _id: PropTypes.string,
  }).isRequired,
  points: PropTypes.shape({
    owner: PropTypes.string,
    pointCount: PropTypes.number,
  }).isRequired,
  profiles: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    owner: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
    currentCourses: PropTypes.arrayOf(String),
    mentorCourses: PropTypes.arrayOf(String),
  })).isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    chat: PropTypes.string,
    sessionId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  })).isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default StudySessionModal;
