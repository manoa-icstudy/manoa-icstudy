import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StudySession = ({ stuff }) => (
  <tr>
    <td>{stuff.name}</td>
    <td>{stuff.date}</td>
    <td>{stuff.icsclass}</td>
    <td>
      <Link to={`/edit/${stuff._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
StudySession.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    icsclass: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default StudySession;
