import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ListReportDate = ({ report }) => (
  <tr>
    <td>{report.date}</td>
  </tr>
);

// Require a document to be passed to this component.
ListReportDate.propTypes = {
  report: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
};

export default ListReportDate;
