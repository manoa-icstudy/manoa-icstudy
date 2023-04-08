import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid>
    <Row className="align-middle text-center">
      <Col className="justify-content-center p-5" style={{ backgroundColor: 'gray' }}>
        <h1 style={{ fontSize: '70px' }}>Welcome to ICStudy</h1>
        <p>Description</p>
        <Button variant="dark">Learn More</Button>
        <Container className="pt-4"><Image src="/images/meteor-logo.png" /></Container>
      </Col>

      <Row className=" align-content-center p-5" style={{ backgroundColor: 'white' }}>
        <h1>Feature</h1>
        <Col style={{ borderColor: 'black', border: 'solid' }} className="m-2 p-2">
          <h3>Feature1</h3>
          <p>Description</p>
          <p>Description</p>
          <p>Description</p>
          <p>Description</p>
          <Button variant="dark">Learn More</Button>
        </Col>

        <Col style={{ borderColor: 'black', border: 'solid' }} className="m-2 p-2">
          <h3>Feature2</h3>
          <p>Description</p>
          <p>Description</p>
          <p>Description</p>
          <p>Description</p>
          <Button variant="dark">Learn More</Button>
        </Col>

        <Col style={{ borderColor: 'black', border: 'solid' }} className="m-2 p-2">
          <h3>Feature3</h3>
          <p>Description</p>
          <p>Description</p>
          <p>Description</p>
          <p>Description</p>
          <Button variant="dark">Learn More</Button>
        </Col>
      </Row>

      <Row className=" justify-content-center mx-auto p-5" style={{ backgroundColor: 'lightgray' }}>
        <Row className="p-5">
          <Col md={4}>
            <h1>We got all</h1>
            <h1 style={{ paddingLeft: '200px' }}>ICS course</h1>
            <h1 style={{ paddingLeft: '300px' }}>covered</h1>
          </Col>

          <Col md={7}>
            <Row>
              <Col>
                <h6>ICS 100+</h6>
                <Col>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 1xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 1xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 1xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 1xx</Button>
                </Col>
              </Col>

              <Col>
                <h6>ICS 200+</h6>
                <Col>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 2xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 2xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 2xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 2xx</Button>
                </Col>
              </Col>

              <Col>
                <h6>ICS 300+</h6>
                <Col>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 3xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 3xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 3xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 3xx</Button>
                </Col>
              </Col>

              <Col>
                <h6>ICS 400+</h6>
                <Col>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 4xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 4xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 4xx</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 4xx</Button>
                </Col>
              </Col>
            </Row>

            <Row className="p-4">
              <Col><Button variant="outline-dark">View All</Button></Col>
            </Row>

          </Col>

        </Row>

        <Row className="justify-content-center p-3">
          <Col md={2}>
            <h1>Post</h1>
            <p>Description</p>
            <Button variant="dark">Create Now</Button>
          </Col>
          <Col md={6}>
            <Image src="/images/meteor-logo.png" style={{ marginRight: '20px' }} />
            <Image src="/images/meteor-logo.png" />
          </Col>
        </Row>

        <Row className="justify-content-center p-3">
          <Col md={6}>
            <Image src="/images/meteor-logo.png" style={{ marginRight: '20px' }} />
            <Image src="/images/meteor-logo.png" />
          </Col>
          <Col md={2}>
            <h1>Reward</h1>
            <p>Description</p>
            <Button variant="dark">Exchange Now</Button>
          </Col>
        </Row>

      </Row>

      <Col className="justify-content-center p-5">
        <h1>The ICStudy Team</h1>
        <p>Description</p>
        <Row className="pt-4">
          <Col><Image src="/images/meteor-logo.png" /></Col>
          <Col><Image src="/images/meteor-logo.png" /></Col>
          <Col><Image src="/images/meteor-logo.png" /></Col>
          <Col><Image src="/images/meteor-logo.png" /></Col>
        </Row>
        <Col className="pt-5"><Button variant="dark">Team Contract</Button></Col>
      </Col>
    </Row>
  </Container>
);

export default Landing;
