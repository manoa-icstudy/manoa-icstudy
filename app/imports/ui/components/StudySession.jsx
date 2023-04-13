import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StudySession = ({ session }) => (
  <tr>
    <td>{session.name}</td>
    <td>{session.date}</td>
    <td>{session.icsclass}</td>
    <td>{session.description}</td>
    <td>
      <Link to={`/editstudysession/${session._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
StudySession.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    icsclass: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default StudySession;
