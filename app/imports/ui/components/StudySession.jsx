import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button, Card, Col, ListGroup, Modal, Row } from 'react-bootstrap';
import { Calendar2, Trash, PeopleFill, GeoAltFill } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { Sessions } from '../../api/session/Session';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StudySession = ({ session, collection }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const removeItem = (docID) => {
    collection.remove(docID);
  };

  const joinButtonText = (text) => {
    document.getElementById(session._id).textContent = text;
  };

  const join = (doc) => {
    if (!(doc.participant.find(user => user === currentUser))) {
      console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
      doc.participant.push(currentUser);
      const newParticipant = doc.participant;
      Sessions.collection.update(doc._id, { $set: { participant: newParticipant } });
      joinButtonText('Leave');
    } else if ((doc.participant.find(user => user === currentUser)) && (currentUser !== doc.owner)) {
      const index = doc.participant.indexOf(currentUser);
      if (index > -1) {
        doc.participant.splice(index, 1);
      }
      const newParticipant = doc.participant;
      Sessions.collection.update(doc._id, { $set: { participant: newParticipant } });
      joinButtonText('Join');
    } else {
      swal('Error', 'You own this Session', 'error');
    }
  };

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Pacific/Honolulu',

  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Card style={{ width: '25rem' }} className="p-0 m-2">
      <Card.Header>
        <Row>
          <Col><Card.Title><h5 className="m-2">{session.icsclass}</h5></Card.Title></Col>
          <Col className="text-end">
            <Button id="left-panel-link" href="/create-report" variant="warning" style={{ color: 'black' }}>Report</Button>
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Button id="left-panel-link" variant="danger" onClick={() => removeItem(session._id)}><Trash /></Button>
            ) : ''}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item><PeopleFill className="mx-1" /><Card.Text className="d-inline-block">{session.name}</Card.Text></ListGroup.Item>
          <ListGroup.Item><GeoAltFill className="mx-1" /><Card.Text className="d-inline-block">{session.location}</Card.Text></ListGroup.Item>
          <ListGroup.Item><Calendar2 className="mx-1" /><Card.Text className="d-inline-block">{new Intl.DateTimeFormat('en-US', options).format(session.date)}</Card.Text></ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <Button id={session._id} variant="outline-success" onClick={() => join(session)}>Join</Button>
          </Col>
          <Col className="text-end">
            <Button id="right-panel-link" onClick={handleShow}>Learn More</Button>
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>{session.icsclass}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{session.description}</Modal.Body>
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
    date: PropTypes.instanceOf(Date),
    icsclass: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default StudySession;
