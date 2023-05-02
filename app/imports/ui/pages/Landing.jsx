import React from 'react';
import '/client/landing/style.css';
import '/client/landing/style.js';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { ChatRightTextFill, Github, PeopleFill, PuzzleFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid>
    <Row className="align-middle text-center">
      <Col className="justify-content-center pb-5 mt-5" id="landing-1">
        <h1 style={{ fontSize: '70px' }}>Welcome to ICStudy</h1>
        <Button variant="dark" href="/feature-guide">Learn More</Button>
        <Container id="container" className="ml-3 mt-4 align-middle justify-content-center">
          <Image src="https://manoa-icstudy.github.io/images/Login.png" />
          <Image src="https://manoa-icstudy.github.io/images/StudySessions.png" />
          <Image src="https://manoa-icstudy.github.io/images/UserProfile.png" />
          <Image src="https://manoa-icstudy.github.io/images/Calendar.png" />
        </Container>
      </Col>

      <Container className="reveal fade-bottom">
        <Row className="align-content-center p-5" style={{ backgroundColor: 'white' }}>
          <h1 id="description">Our Goals</h1>
          <Col style={{ borderColor: 'black', border: 'solid' }} className="m-4 p-4">
            <h3> <PeopleFill /> &nbsp;Engagement</h3>
            <Image className="m-4" src="https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_960_720.jpg" width={400} />
            <p>The goal of ICStudy is to develop strategies that increase student engagement inside and outside the classroom.
              This may involve exploring the use of technology, creating more interactive lessons, and providing opportunities for student-led learning.
              By increasing student engagement, we hope to improve student outcomes and create a more positive learning environment.
            </p>
          </Col>

          <Col style={{ borderColor: 'black', border: 'solid' }} className="m-4 p-4">
            <h3> <ChatRightTextFill /> &nbsp;Collaboration</h3>
            <Image className="m-4" src="https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_960_720.jpg" width={400} />
            <p>Collaborate on challenging coursework or assignments.
              By sharing ideas and working together, both parties can learn from each other and improve their understanding of the material.
            </p>
          </Col>

          <Col style={{ borderColor: 'black', border: 'solid' }} className="m-4 p-4">
            <h3> <PuzzleFill /> &nbsp;Diversity and Inclusion</h3>
            <Image className="m-4" src="https://cdn.pixabay.com/photo/2020/09/30/08/55/unity-in-diversity-5615014_960_720.jpg" width={250} />
            <p>Promote diversity and inclusion in the classroom.
              This may involve exploring ways to create a more diverse student body, developing culturally responsive teaching practices,
              and providing resources for teachers to better understand and address issues of diversity and inclusion.
              By promoting diversity and inclusion, we hope to create a more equitable and welcoming learning environment for all students.
            </p>
          </Col>
        </Row>
      </Container>

      <Row className=" justify-content-center mx-auto">
        <Row className="p-5 reveal fade-left">
          <Col md={4}>
            <h1>We got all</h1>
            <h1 style={{ paddingLeft: '125px' }}>ICS courses</h1>
            <h1 style={{ paddingLeft: '250px' }}>covered</h1>
          </Col>

          <Col md={7}>
            <Row>
              <Col>
                <h6>ICS 100+</h6>
                <Col>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 101</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 102</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 103</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 110</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 111</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 141</Button>
                </Col>
              </Col>

              <Col>
                <h6>ICS 200+</h6>
                <Col>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 210</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 211</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 212</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 215</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 222</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 235</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 241</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 290</Button>
                </Col>
              </Col>

              <Col>
                <h6>ICS 300+</h6>
                <Col>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 311</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 312</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 313</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 314</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 321</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 331</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 332</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 351</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 355</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 361</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 369</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 390</Button>
                </Col>
              </Col>

              <Col>
                <h6>ICS 400+</h6>
                <Col>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 414</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 415</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 419</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 421</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 422</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 423</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 424</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 425</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 426</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 427</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 428</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 431</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 432</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 434</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 435</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 438</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 441</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 442</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 443</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 451</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 452</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 455</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 461</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 462</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 464</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 465</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 466</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 469</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 471</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 475</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 476</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 481</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 483</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 484</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 485</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 486</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 491</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 495</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 496</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 499</Button>
                </Col>
              </Col>

              <Col>
                <h6>ICS 500+</h6>
                <Col>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 500</Button>
                </Col>
              </Col>

              <Col>
                <h6>ICS 600+</h6>
                <Col>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 606</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 611</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 612</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 613</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 616</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 621</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 622</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 623</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 624</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 632</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 635</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 636</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 637</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 641</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 643</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 651</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 655</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 660</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 661</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 663</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 664</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 667</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 668</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 669</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 675</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 676</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 681</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 682</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 683</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 685</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 686</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 690</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 691</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 695</Button>
                  <Button variant="outline-dark" size="sm" className="m-2">ICS 699</Button>
                </Col>
              </Col>

            </Row>
          </Col>

        </Row>

        <Row className="justify-content-center p-3 reveal fade-right">
          <Col md={1}>
            <h1>Post</h1>
            <p>Post or join a session</p>
            <Button href="/create-study-session" variant="dark">Create Now</Button>
          </Col>
          <Col md={8}>
            <Image src="https://manoa-icstudy.github.io/images/CreateStudySessions.png" style={{ marginRight: '20px' }} width={500} />
            <Image src="https://manoa-icstudy.github.io/images/StudySessions.png" width={500} />
          </Col>
        </Row>

        <Row className="justify-content-center p-3 reveal fade-left">
          <Col md={8}>
            <Image src="https://manoa-icstudy.github.io/images/Leaderboard.png" style={{ marginRight: '20px' }} width={500} />
            <Image src="https://manoa-icstudy.github.io/images/Redeem.png" width={500} />
          </Col>
          <Col md={1}>
            <h1>Rewards</h1>
            <p>Get rewarded for helping</p>
            <Button href="/leaderboard" variant="dark">Leaderboard</Button>
          </Col>
        </Row>

      </Row>

      <Col className="justify-content-center p-4 mb-5 mt-5 reveal fade-bottom " style={{ backgroundColor: 'white' }}>
        <h1>The ICStudy Team</h1>
        <Row id="team-github">
          <Col>
            <Image src="https://github.com/alexander-hung.png" width={400} className="pt-3 pb-3" />
            <h4><Link to="https://alexander-hung.github.io/"><Github /> Alexander Hung</Link></h4>
          </Col>
          <Col>
            <Image src="https://github.com/etahara.png" width={400} className="pt-3 pb-3" />
            <h4><Link to="https://etahara.github.io/"><Github /> Evan Tahara</Link></h4>
          </Col>
          <Col>
            <Image src="https://github.com/jennifermnakano.png" width={400} className="pt-3 pb-3" />
            <h4><Link to="https://jennifermnakano.github.io/"><Github /> Jennifer Nakano</Link></h4>
          </Col>
          <Col>
            <Image src="https://github.com/jorwo.png" width={400} className="pt-3 pb-3" />
            <h4><Link to="https://jorwo.github.io/"><Github /> Jordan Wong</Link></h4>
          </Col>
        </Row>
        <Col className="pt-4"><Button href="https://docs.google.com/document/d/10MdB72cwWprjIAuWE9Y-79FKaIcFnSHrYCL42ZXevb4/edit" variant="dark">Team Contract</Button></Col>
      </Col>
    </Row>
  </Container>
);

export default Landing;
