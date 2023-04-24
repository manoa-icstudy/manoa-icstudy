import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button, Card, CardGroup, Container, ListGroup, Modal } from 'react-bootstrap';
import { Calendar2, Trash, PeopleFill } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StudySession = ({ session, collection }) => {
  const removeItem = (docID) => {
    collection.remove(docID);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title>{session.icsclass}</Card.Title>
            <ListGroup>
              <ListGroup.Item><PeopleFill /><Card.Text className="d-inline-block">{session.name}</Card.Text></ListGroup.Item>
              <ListGroup.Item><Calendar2 /><Card.Text className="d-inline-block">{session.date.toDateString()}</Card.Text></ListGroup.Item>
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <Button id="left-panel-link" href="/create-report" variant="warning" style={{ color: 'black' }}>Report it</Button>
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <td><Button id="left-panel-link" onClick={() => removeItem(session._id)}><Trash /></Button></td>
            ) : ''}
            <>
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
            </>
          </Card.Footer>
        </Card>
      </CardGroup>
    </Container>
  );
};

// Require a document to be passed to this component.
StudySession.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    icsclass: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default StudySession;
