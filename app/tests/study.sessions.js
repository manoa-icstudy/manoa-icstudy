import { Selector } from 'testcafe';

class StudySessions {
  constructor() {
    this.pageId = '#study-session-list';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasTable(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(1);
  }

  async hasTableAfterCrate(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(2);
  }

  async UserHomeSession(testController) {
    await testController.click('#goto-user-home-session');
  }

  async UserHomeJoin(testController) {
    await testController.click('#goto-user-home-join');
  }

  async UserHomeCreate(testController) {
    await testController.click('#goto-create-study-session');
  }
}

export const studySessions = new StudySessions();
