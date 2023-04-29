import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PointsStuff = ({ points, point }) => {

  const discard = (pointData) => {
    point.update(pointData, { $set: { pointCount: 0 } });
  };

  return (
    <tr>
      <td>{points.owner}</td>
      <td>{points.pointCount}</td>
      {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
        <td><Button variant="danger" onClick={() => discard(points._id)}><Trash /></Button></td>
      ) : ''}
    </tr>
  );
};

// Require a document to be passed to this component.
PointsStuff.propTypes = {
  points: PropTypes.shape({
    owner: PropTypes.string,
    pointCount: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  point: PropTypes.object.isRequired,
};

export default PointsStuff;
