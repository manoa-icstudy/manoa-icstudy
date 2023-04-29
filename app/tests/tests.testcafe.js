import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { calendarPage } from './calendar.page';
import { userHomePage } from './userhome.page';
import { navBar } from './navbar.component';
import { studySessions } from './study.sessions';
import { createStudySessions } from './create.study.sessions';
import { createFeedbackPage } from './create.feedback.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that calendar page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoCalendarPage(testController);
  await calendarPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the Create Study Session and Study Sessions page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoStudySessionPage(testController);
  await studySessions.isDisplayed(testController);
  await studySessions.hasTable(testController);
  // create study session
  await navBar.gotoCreateStudySessionPage(testController);
  await createStudySessions.isDisplayed(testController);
  await createStudySessions.create(testController);
  await navBar.gotoStudySessionPage(testController);
  await studySessions.isDisplayed(testController);
  // check 2 row table
  await studySessions.hasTableAfterCrate(testController);
  // check user home session
  await navBar.gotoProfilePage(testController);
  await studySessions.UserHomeSession(testController);
  await studySessions.hasTableAfterCrate(testController);
  // check user home joined
  await studySessions.UserHomeJoin(testController);
  await studySessions.hasTableAfterCrate(testController);

  await studySessions.UserHomeCreate(testController);
  await createStudySessions.isDisplayed(testController);
});

test('Test that Admin signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(testController, adminCredentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that create feedback works', async (testController) => {
  await navBar.gotoFeedbackPage(testController);
  await createFeedbackPage.createFeedbackPage(testController);
});

test('Test that create report works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoStudySessionPage(testController);
  await studySessions.createReportPage(testController);
});

test.only('Test the Admin Create Study Session and Study Sessions page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.gotoStudySessionPage(testController);
  await studySessions.isDisplayed(testController);
  await studySessions.hasTable(testController);
  // create study session
  await navBar.gotoCreateStudySessionPage(testController);
  await createStudySessions.isDisplayed(testController);
  await createStudySessions.create(testController);
  await navBar.gotoStudySessionPage(testController);
  await studySessions.isDisplayed(testController);
  // check 1 row table
  await studySessions.hasTable(testController);
  // check user home session
  await navBar.gotoProfilePage(testController);
  await studySessions.UserHomeSession(testController);
  await studySessions.hasTable(testController);
  // check user home joined
  await studySessions.UserHomeJoin(testController);
  await studySessions.hasTable(testController);

  await studySessions.UserHomeCreate(testController);
  await createStudySessions.isDisplayed(testController);
});

test('Test that user home page works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoProfilePage(testController);
  await userHomePage.isDisplayed(testController);
  await userHomePage.editProfile(
    testController,
    'Phillip',
    'Johnson',
    'https://avatars.githubusercontent.com/u/290288?v=4',
    ['ICS 101', 'ICS 211'],
    ['ICS 111', 'ICS 141', 'ICS 211', 'ICS 311'],
  );
  await userHomePage.hasProfile(
    testController,
    'Phillip',
    'Johnson',
    'https://avatars.githubusercontent.com/u/290288?v=4',
  );
});
