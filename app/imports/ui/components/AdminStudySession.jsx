import React from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { Sessions } from '../../api/session/Session';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AdminStudySession = ({ session, collection }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const removeItem = (docID) => {
    collection.remove(docID);
  };

  const join = (doc) => {
    if (doc.participant.find(user => user === currentUser)) {
      swal('Error', 'You have joined', 'error');
    } else {
      doc.participant.push(currentUser);
      const newParticipant = doc.participant;
      Sessions.collection.update(doc._id, { $set: { participant: newParticipant } });
      swal('Success', 'Join success', 'success');
    }
  };

  return (
    <tr>
      <td>{session.name}</td>
      <td>{session.icsclass}</td>
      <td>{session.description}</td>
      <td>{session.date.toDateString()}</td>
      <td>
        <Row>
          <Col style={{ paddingRight: '0' }}><Button variant="info" onClick={() => join(session)}>Join</Button></Col>
          <Col style={{ paddingLeft: '0' }}>
            <DropdownButton variant="info">
              {/* eslint-disable-next-line react/prop-types */}
              {session.participant.map(user => <Dropdown.Item key={user}>{user}</Dropdown.Item>)}
            </DropdownButton>
          </Col>
        </Row>
      </td>
      <td><Button href="/create-report" variant="warning" style={{ color: 'black' }}>Report it</Button></td>
      <td><Button variant="danger" onClick={() => removeItem(session._id)}><Trash /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
AdminStudySession.propTypes = {
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

export default AdminStudySession;
