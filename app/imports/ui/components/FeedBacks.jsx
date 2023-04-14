import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const FeedBacks = ({ feedback }) => (
  <tr>
    <td>{feedback.experience}</td>
    <td>{feedback.feedback}</td>
    <td>{feedback.description}</td>
  </tr>
);

// Require a document to be passed to this component.
FeedBacks.propTypes = {
  feedback: PropTypes.shape({
    experience: PropTypes.string,
    feedback: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default FeedBacks;
