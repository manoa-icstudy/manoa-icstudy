import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ListReport = ({ report, collection }) => {
  const removeItem = (docID) => {
    collection.remove(docID);
  };
  return (
    <tr>
      <td>{report.name}</td>
      <td>{report.description}</td>
      <td>{report.reportUser}</td>
      {/* eslint-disable-next-line react/prop-types */}
      <td>{report.date}</td>
      <td><td><Button variant="danger" onClick={() => removeItem(report._id)}><Trash /></Button></td></td>
    </tr>
  );
};

// Require a document to be passed to this component.
ListReport.propTypes = {
  report: PropTypes.shape({
    name: PropTypes.string.isRequired,
    reportUser: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default ListReport;
