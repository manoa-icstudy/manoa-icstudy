import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Report = ({ report }) => (
  <tr>
    <td>{report.name}</td>
    <td>{report.date}</td>
    <td>{report.description}</td>
    <td>{report.reportUser}</td>
  </tr>
);

// Require a document to be passed to this component.
Report.propTypes = {
  report: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    reportUser: PropTypes.string,
    description: PropTypes.string,
    numberUser: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Report;
