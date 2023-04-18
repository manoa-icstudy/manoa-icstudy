import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AdminStudySession = ({ session, collection }) => {
  const removeItem = (docID) => {
    collection.remove(docID);
  };
  return (
    <tr>
      <td>{session.name}</td>
      <td>{session.date.toDateString()}</td>
      <td>{session.icsclass}</td>
      <td>{session.description}</td>
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
