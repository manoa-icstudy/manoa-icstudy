import React from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button } from 'react-bootstrap';
import { MdRedeem } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PointsStuff = ({ points, collection }) => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const removeItem = (docID) => {
    collection.remove(docID);
  };

  return (
    <tr>
      <td>{points.name}</td>
      <td>{points.pointCount}</td>
      {Roles.userIsInRole(Meteor.user(), currentUser) ? (
        <td><Button variant="danger" onClick={() => removeItem(points._id)}><MdRedeem /></Button></td>
      ) : ''}
    </tr>
  );
};

// Require a document to be passed to this component.
PointsStuff.propTypes = {
  points: PropTypes.shape({
    name: PropTypes.string,
    pointCount: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default PointsStuff;
