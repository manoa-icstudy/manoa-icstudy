import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TestPage = () => (
  <Container fluid>
    <div id="introd" className="d-flex flex-column">
      <div className="intro">
        <h1>Hi!</h1>
      </div>
      <div id="mainIntro">
        <div className="content">
          <Link to="/"><p><br />Start Your Journey</p></Link>
        </div>
      </div>
    </div>
  </Container>
);

export default TestPage;
