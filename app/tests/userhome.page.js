import { Selector } from 'testcafe';

class UserHomePage {
  constructor() {
    this.pageId = '#user-home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async editProfile(testController, firstName, lastName, pictureUrl, currentCourses, mentorCourses) {
    await testController.click('#edit-profile');
    await testController.typeText('#firstName-field', firstName, { replace: true });
    await testController.typeText('#lastName-field', lastName, { replace: true });
    await testController.typeText('#picture-field', pictureUrl, { replace: true });
    currentCourses.forEach(async course => {
      await testController.click(Selector('option').withText(course).nth(0));
    });
    mentorCourses.forEach(async course => {
      await testController.click(Selector('option').withText(course).nth(1));
    });
    await testController.click(Selector('input').withAttribute('type', 'submit'));
    await testController.click(Selector('button').withText('OK'));
  }

  async hasProfile(testController, firstName, lastName, pictureUrl) {
    const image = Selector('img').withAttribute('src', pictureUrl);
    await testController.expect(Selector('#firstName').textContent).eql(firstName);
    await testController.expect(Selector('#lastName').textContent).eql(lastName);
    await testController.expect(image.exists).ok();
  }
}

export const userHomePage = new UserHomePage();
