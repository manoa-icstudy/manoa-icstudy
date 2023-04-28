import { Selector } from 'testcafe';

class CreateStudySessions {
  constructor() {
    this.pageId = '#create-study-session';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async create(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#create-study-session-name', 'John');
    await testController.typeText('#create-study-session-location', 'test');
    await testController.typeText('#create-study-session-description', 'test');
    await testController.click('#create-study-session-submit input.btn.btn-primary');
    await testController.click(Selector('button').withText('OK'));
  }
}

export const createStudySessions = new CreateStudySessions();
