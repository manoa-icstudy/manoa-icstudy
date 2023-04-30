import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button, Card, Col, ListGroup, Modal, Row, Tabs, Tab } from 'react-bootstrap';
import { Calendar2, Trash, PeopleFill, GeoAltFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Sessions } from '../../api/session/Session';
import Note from './Note';
import AddNote from '../pages/AddNote';
import { Notes } from '../../api/note/Notes';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
// eslint-disable-next-line react/prop-types
const StudySession = ({ session, collection, joinText, notes, point }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const removeItem = (docID) => {
    collection.remove(docID);
  };

  // eslint-disable-next-line react/prop-types
  if (!(session.participant.find(user => user === currentUser))) {
    // eslint-disable-next-line no-param-reassign
    joinText = 'Join';
    // eslint-disable-next-line react/prop-types
  } else if ((session.participant.find(user => user === currentUser)) && (currentUser !== session.owner)) {
    // eslint-disable-next-line no-param-reassign
    joinText = 'Leave';
  } else {
    // eslint-disable-next-line no-param-reassign,no-unused-vars
    joinText = 'Owner';
  }

  const joinButtonText = (text) => {
    document.getElementById(session._id).textContent = text;
  };

  const join = (doc, pointDoc) => {
    if (!(doc.participant.find(user => user === currentUser))) {
      const data = pointDoc.findOne({ owner: currentUser });
      pointDoc.update(data._id, { $inc: { pointCount: 1 } });

      console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
      doc.participant.push(currentUser);
      const newParticipant = doc.participant;
      Sessions.collection.update(doc._id, { $set: { participant: newParticipant } });
      joinButtonText('Leave');
    } else if ((doc.participant.find(user => user === currentUser)) && (currentUser !== doc.owner)) {

      const data = pointDoc.findOne({ owner: currentUser });
      pointDoc.update(data._id, { $inc: { pointCount: -1 } });

      const index = doc.participant.indexOf(currentUser);
      if (index > -1) {
        doc.participant.splice(index, 1);
      }
      const newParticipant = doc.participant;
      Sessions.collection.update(doc._id, { $set: { participant: newParticipant } });
      joinButtonText('Join');
    } else {
      joinButtonText('Owner');
    }
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Card style={{ width: '25rem' }} className="p-0 m-2">
      <Card.Header>
        <Row>
          <Col><Card.Title><h5 className="m-2">{session.name}</h5></Card.Title></Col>
          <Col className="text-end">
            <Button id="create-report" className="left-panel-link" href="/create-report" variant="warning" style={{ color: 'black', marginRight: '5px' }}>Report</Button>
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Button id="left-panel-link" variant="danger" onClick={() => removeItem(session._id)}><Trash /></Button>
            ) : ''}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item><PeopleFill className="mx-1" /><Card.Text className="d-inline-block">{session.icsclass}</Card.Text></ListGroup.Item>
          <ListGroup.Item><GeoAltFill className="mx-1" /><Card.Text className="d-inline-block">{session.location}</Card.Text></ListGroup.Item>
          <ListGroup.Item><Calendar2 className="mx-1" /><Card.Text className="d-inline-block">{new Intl.DateTimeFormat('en-US', options).format(session.date)} UTC</Card.Text></ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <Button id={session._id} variant="outline-success" onClick={() => join(session, point)}>{joinText}</Button>
            { currentUser === session.owner && <Button href={`/edit-study-session/${session._id}`} className="ms-2" variant="outline-success" id="edit-study-session">Edit</Button> }
          </Col>
          <Col className="text-end">
            <Button id="right-panel-link" onClick={handleShow}>Learn More</Button>
            <Modal show={show} onHide={handleClose} animation={false} id="sessionModal">
              <Modal.Header closeButton>
                <Modal.Title>{session.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Tabs>
                  <Tab eventKey="description" title="Description">
                    {session.description}
                  </Tab>

                  <Tab eventKey="participant" title="Participant">
                    {/* eslint-disable-next-line react/prop-types */}
                    <Modal.Body>{session.participant.map(user => <Col key={user}>-&nbsp;&nbsp; {user}</Col>)}</Modal.Body>
                  </Tab>

                  <Tab eventKey="chat" title="Chat">
                    <ListGroup>
                      {notes.map((note) => <Note key={note._id} note={note} collection={Notes.collection} />)}
                    </ListGroup>
                    <AddNote owner={currentUser} sessionId={session._id} />
                    <Link to={`/edit/${session._id}`}>Edit</Link>
                  </Tab>
                </Tabs>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

// Require a document to be passed to this component.
StudySession.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    owner: String,
    date: PropTypes.instanceOf(Date),
    icsclass: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  point: PropTypes.object.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    chat: PropTypes.string,
    sessionId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  })).isRequired,
};

export default StudySession;
