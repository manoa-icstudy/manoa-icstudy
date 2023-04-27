import React from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button } from 'react-bootstrap';
import { ArchiveFill } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PointsStuff = ({ points }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <tr>
      <td>{points.owner}</td>
      <td>{points.pointCount}</td>
      {Roles.userIsInRole(Meteor.user(), currentUser) ? (
        <td><Button variant="danger"><ArchiveFill /></Button></td>
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
};

export default PointsStuff;
