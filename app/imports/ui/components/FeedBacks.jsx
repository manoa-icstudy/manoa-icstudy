import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const FeedBacks = ({ feedback }) => (
  <tr>
    <td style={{ minWidth: '269px', height: '25px', border: 'dashed 1px lightblue', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '269px' }}>{feedback.name}</td>
    <td style={{ minWidth: '269px', height: '25px', border: 'dashed 1px lightblue', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '269px' }}>{feedback.experience}</td>
    <td style={{ minWidth: '269px', height: '25px', border: 'dashed 1px lightblue', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '269px' }}>{feedback.description}</td>
    <td style={{ minWidth: '269px', height: '25px', border: 'dashed 1px lightblue', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '269px' }}>{feedback.overallThoughts}</td>
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
