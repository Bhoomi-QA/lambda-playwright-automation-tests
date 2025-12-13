import { Page, expect } from '@playwright/test';
import {
  USER_MESSAGE_INPUT,
  SHOW_MESSAGE_BUTTON,
  RESULT_MESSAGE,
} from '../locator/SimpleFormLocator';

export class SimpleFormPage {
  constructor(private page: Page) {}

  async enterMessage(message: string) {
    await this.page.locator(USER_MESSAGE_INPUT).first().fill(message);
  }

  async showMessage() {
    await this.page.getByRole(SHOW_MESSAGE_BUTTON.role as 'button', { name: SHOW_MESSAGE_BUTTON.name }).click();
  }

  async expectMessage(message: string) {
    const result = this.page.locator(RESULT_MESSAGE);
    await expect(result).toHaveText(message);
  }
}