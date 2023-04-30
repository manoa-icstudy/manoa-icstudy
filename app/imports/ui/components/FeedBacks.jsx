import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const FeedBacks = ({ feedback }) => (
  <tr>
    <td>{feedback.name}</td>
    <td>{feedback.experience}</td>
    <td>{feedback.description}</td>
    <td>{feedback.overallThoughts}</td>
  </tr>
);

// Require a document to be passed to this component.
FeedBacks.propTypes = {
  feedback: PropTypes.shape({
    name: PropTypes.string,
    experience: PropTypes.string,
    description: PropTypes.string,
    overallThoughts: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default FeedBacks;
