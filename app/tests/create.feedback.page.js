import { Selector } from 'testcafe';

class CreateFeedbackPage {
  constructor() {
    this.pageId = '#create-feedback';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async createFeedbackPage(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#description-field', 'test');
    await testController.click('#submit-field input.btn.btn-primary');
    await testController.click(Selector('button').withText('OK'));
  }
}

export const createFeedbackPage = new CreateFeedbackPage();
