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
    const rowCount = Selector('div').withText('Learn More').count;
    await testController.expect(rowCount).gte(1);
  }

  async hasTableAfterCrate(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    const rowCount = Selector('div').withText('Learn More').count;
    await testController.expect(rowCount).gte(2);
  }

  async createReportPage(testController) {
    await this.isDisplayed(testController);
    await testController.click('#create-report');
    await testController.typeText('#name-field', 'John');
    await testController.typeText('#report-user-field', 'Joe');
    await testController.typeText('#description-field', 'test');
    await testController.click('#submit-field input.btn.btn-primary');
    await testController.click(Selector('button').withText('OK'));
  }

  async editReportPage(testController) {
    await this.isDisplayed(testController);
    await testController.click('#create-report');
    await testController.typeText('#name-field', 'John');
    await testController.typeText('#report-user-field', 'Joe');
    await testController.typeText('#description-field', 'test');
    await testController.click('#submit-field input.btn.btn-primary');
    await testController.click(Selector('button').withText('OK'));
    await testController.click(Selector('a').withText('Edit this report'));
    await testController.typeText('#name-field', 'Alex', { replace: true });
    await testController.typeText('#report-user-field', 'john', { replace: true });
    await testController.typeText('#description-field', 'test 2', { replace: true });
    await testController.click('#submit-field input.btn.btn-primary');
    await testController.click(Selector('button').withText('OK'));
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
