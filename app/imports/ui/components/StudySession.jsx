import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StudySession = ({ session, collection }) => {
  const removeItem = (docID) => {
    collection.remove(docID);
  };
  return (
    <Row>
      <Col className="col-sm-4">
        <Card className="text-dark bg-light">
          <Card.Header className="bg-primary text-center text-warning">
            <Card.Title>{session.icsclass}</Card.Title>
            <Card.Subtitle><span className="created-by">Created By: {session.name}</span></Card.Subtitle>
            <Card.Subtitle><span className="date">Date: {session.date.toDateString()}</span></Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <Card.Text>Description:</Card.Text>
            <Card.Text>{session.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Col >
              <Button href="/create-report" variant="warning" style={{ color: 'black' }}>Report it</Button>
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                <td><Button variant="danger" onClick={() => removeItem(session._id)}><Trash /></Button></td>
              ) : ''}
            </Col>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
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
