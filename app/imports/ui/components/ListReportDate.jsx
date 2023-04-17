import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ListReportDate = ({ reportDate, collection }) => {
  const removeItem = (docID) => {
    collection.remove(docID);
  };
  return (
    <tr>
      <td>{reportDate.owner}</td>
      <td>{reportDate.name}</td>
      <td>{reportDate.reportUser}</td>
      <td>{reportDate.description}</td>
      <td>{reportDate.date.toDateString()}</td>
      <td><td><Button variant="danger" onClick={() => removeItem(reportDate._id)}><Trash /></Button></td></td>
    </tr>
  );
};

// Require a document to be passed to this component.
ListReportDate.propTypes = {
  reportDate: PropTypes.shape({
    name: PropTypes.string,
    reportUser: PropTypes.string,
    owner: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default ListReportDate;
