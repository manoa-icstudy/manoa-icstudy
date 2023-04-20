import React from 'react';
import { Badge, Card, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

/* Component for layout out a Profile Card. */
const StudySessionCard = ({ studySession }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={studySession.picture} width={50} />
        <Card.Title>{studySession.firstName} {studySession.lastName}</Card.Title>
        <Card.Subtitle><span className="date">{studySession.title}</span></Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {studySession.bio}
        </Card.Text>
        <Card.Text>
          {studySession.interests.map((interest, index) => <Badge key={index} bg="info">{interest}</Badge>)}
        </Card.Text>
        <h5>Projects</h5>
        {studySession.projects.map((project, index) => <Image key={index} src={project} width={50} />)}
      </Card.Body>
    </Card>
  </Col>
);

StudySessionCard.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    picture: PropTypes.string,
    title: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
    projects: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default StudySessionCard;
