import React from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { Sessions } from '../../api/session/Session';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StudySession = ({ session, collection, point }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const removeItem = (docID) => {
    collection.remove(docID);
  };

  const join = (doc, pointDoc) => {
    if (!(doc.participant.find(user => user === currentUser))) {
      const data = pointDoc.findOne({ owner: currentUser });
      pointDoc.update(data._id, { $inc: { pointCount: 1 } });

      console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
      doc.participant.push(currentUser);
      const newParticipant = doc.participant;
      Sessions.collection.update(doc._id, { $set: { participant: newParticipant } });
      swal('Success', 'Join success', 'success');
    } else if ((doc.participant.find(user => user === currentUser)) && (currentUser !== doc.owner)) {

      const data = pointDoc.findOne({ owner: currentUser });
      pointDoc.update(data._id, { $inc: { pointCount: -1 } });

      const index = doc.participant.indexOf(currentUser);
      if (index > -1) {
        doc.participant.splice(index, 1);
      }
      const newParticipant = doc.participant;
      Sessions.collection.update(doc._id, { $set: { participant: newParticipant } });
      swal('Success', 'Quit success', 'success');
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

  return (
    <tr>
      <td>{session.name}</td>
      <td>{session.location}</td>
      <td>{session.icsclass}</td>
      <td>{session.description}</td>
      <td>{new Intl.DateTimeFormat('en-US', options).format(session.date)}</td>
      <td>
        <Container>
          <Row>
            <Col style={{ paddingRight: '0' }}><Button variant="info" onClick={() => join(session, point)}>Join/Leave</Button></Col>
            <Col style={{ paddingLeft: '0' }}>
              <DropdownButton variant="info">
                <Dropdown.ItemText>Participant:</Dropdown.ItemText>
                {/* eslint-disable-next-line react/prop-types */}
                <Dropdown.Item>{session.participant.map(user => <Col key={user}>-&nbsp;&nbsp; {user}</Col>)}</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        </Container>
      </td>
      <td><Button href="/create-report" variant="warning" style={{ color: 'black' }}>Report it</Button></td>
      {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
        <td><Button variant="danger" onClick={() => removeItem(session._id)}><Trash /></Button></td>
      ) : ''}
    </tr>
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
  // eslint-disable-next-line react/forbid-prop-types
  point: PropTypes.object.isRequired,
};

export default StudySession;
