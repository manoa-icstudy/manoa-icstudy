import { Selector } from 'testcafe';

class StudySessions {
  constructor() {
    this.pageId = '#study-session-list';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async hasTable(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    const rowCount = Selector('tr').count;
    await testController.expect(rowCount).gte(1);
  }
}

export const studySessions = new StudySessions();
