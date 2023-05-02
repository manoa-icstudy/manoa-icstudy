import { Selector } from 'testcafe';
import { Archive } from 'react-bootstrap-icons';

class LeaderboardPage {
  constructor() {
    this.pageId = '#leaderboard-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async tryRewards(testController) {
    await testController.click('#leaderboard-button');
    await testController.click(Selector('button').withExactText('$10 voucher (5)'));
    await testController.click(Selector('button').withText('OK'));
    await testController.click(Selector('button').withText('OK'));
    await testController.click('#leaderboard-button');
    await testController.click(Selector('button').withExactText('Free item under $25 (10)'));
    await testController.click(Selector('button').withText('OK'));
    await testController.click(Selector('button').withText('OK'));
  }
}

export const leaderboardPage = new LeaderboardPage();
