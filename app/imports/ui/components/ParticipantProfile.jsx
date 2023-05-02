import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { EnvelopeFill } from 'react-bootstrap-icons';

const ParticipantProfile = ({ profiles, participant }) => {
  // eslint-disable-next-line react/prop-types
  const participantProfile = profiles.find(profile => profile.owner === participant);
  const tooltip = (
    <Tooltip>{participantProfile.email}</Tooltip>
  );

  return (
    <span>
      {`${participantProfile.firstName} ${participantProfile.lastName}`}
      <OverlayTrigger overlay={tooltip} placement="top">
        <EnvelopeFill className="ms-1 text-primary" />
      </OverlayTrigger>
    </span>
  );
};

ParticipantProfile.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    owner: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
    currentCourses: PropTypes.arrayOf(String),
    mentorCourses: PropTypes.arrayOf(String),
  })).isRequired,
  participant: PropTypes.string.isRequired,
};

export default ParticipantProfile;
