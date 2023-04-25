import React from 'react';
import { Container, Image } from 'react-bootstrap';

const Calendar = () => (
  <Container className="ml-3 mt-4 mb-4 text-align-center">
    <h1> Welcome to our website! Here are some pointers...</h1>
    <p>Log in to your account here:</p>
    <Image src="https://manoa-icstudy.github.io/images/Login.png" width="1000" />
    <p>If you don&apos;t have an account yet, register for one here:</p>
    <Image src="https://manoa-icstudy.github.io/images/SignUp.png" width="1000" />
    <p>This is where you can create new study sessions:</p>
    <Image src="https://manoa-icstudy.github.io/images/CreateStudySessions.png" width="1000" />
    <p>This is where you can view all study sessions:</p>
    <Image src="https://manoa-icstudy.github.io/images/StudySessions.png" width="1000" />
    <p>Check out and edit you user profile:</p>
    <Image src="https://manoa-icstudy.github.io/images/UserProfile.png" width="1000" />
    <p>Take a look here at the calendar:</p>
    <Image src="https://manoa-icstudy.github.io/images/Calendar.png" width="1000" />
    <p>If you&apos;re feeling generous, leave us some feedback :)</p>
    <Image src="https://manoa-icstudy.github.io/images/Feedback.png" width="1000" />
    <p>If you&apos;re ever feeling lost, come back to the landing page: </p>
    <Image src="https://manoa-icstudy.github.io/images/LandingPage.png" width="1000" />
  </Container>
);

export default Calendar;
