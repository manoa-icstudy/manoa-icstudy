import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button, Col, ListGroup } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Note = ({ note, collection }) => {
  const removeItem = (docID) => {
    collection.remove(docID);
  };

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'UTC',

  };

  return (
    <ListGroup.Item>
      <p className="fw-bold">{note.owner}: {new Intl.DateTimeFormat('en-US', options).format(note.createdAt)} UTC</p>
      <p>- {note.chat}
        <Col className="text-end">
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Button variant="danger" onClick={() => removeItem(note._id)}><Trash /></Button>
          ) : ''}
        </Col>
      </p>

    </ListGroup.Item>
  );
};

// Require a document to be passed to this component.
Note.propTypes = {
  note: PropTypes.shape({
    chat: PropTypes.string,
    sessionId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default Note;
