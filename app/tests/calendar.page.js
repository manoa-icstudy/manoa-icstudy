import { Selector } from 'testcafe';

class CalendarPage {
  constructor() {
    this.pageId = '#calendar-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async openEvent(testController) {
    await testController.click(Selector('div').withExactText('ICS 314 | Final Exam Review'));
  }

  async closeEvent(testController) {
    await testController.click(Selector('button').withExactText('Close'));
  }

  async joinStudySession(testController) {
    if (Selector('button').withExactText('Join').exists) {
      await testController.click(Selector('button').withExactText('Join'));
    }
  }

  async leaveStudySession(testController) {
    if (Selector('button').withExactText('Leave').exists) {
      await testController.click(Selector('button').withExactText('Leave'));
    }
  }

  async hasParticipant(testController, participant) {
    await testController.expect(Selector('span').withExactText(participant).exists).ok();
  }

  async viewParticipants(testController) {
    await testController.click(Selector('button').withAttribute('data-rr-ui-event-key', 'participants'));
  }

  async chat(testController) {
    await testController.click(Selector('button').withAttribute('data-rr-ui-event-key', 'chat'));
    await testController.typeText(Selector('input').withAttribute('name', 'chat'), 'test');
    await testController.click(Selector('input').withAttribute('type', 'submit'));
  }

  async gotoMonthYearBackwards(testController, monthYear) {
    if ((!Selector('#fc-dom-86').withExactText('May 2023').exists)) {
      await this.gotoMonthYearBackwards(testController, monthYear);
    }
  }
}

export const calendarPage = new CalendarPage();
