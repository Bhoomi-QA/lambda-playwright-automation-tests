import { Page, expect } from '@playwright/test';
import {
  HOME_URL,
  SIMPLE_FORM_DEMO_LINK,
  DRAG_DROP_SLIDERS_LINK,
  INPUT_FORM_SUBMIT_LINK,
} from '../locator/HomePageLocator';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(HOME_URL);
    await expect(this.page).toHaveURL(/selenium-playground/);
  }

  async openSimpleFormDemo() {
    await this.page.getByRole('link', { name: SIMPLE_FORM_DEMO_LINK.name }).click();
    await expect(this.page).toHaveURL(/simple-form-demo/);
  }

  async openDragDropSliders() {
    await this.page.getByRole('link', { name: DRAG_DROP_SLIDERS_LINK.name }).click();
    await expect(this.page).toHaveURL(/drag-drop-range-sliders-demo/);
  }

  async openInputFormSubmit() {
    await this.page.getByRole('link', { name: INPUT_FORM_SUBMIT_LINK.name }).click();
    await expect(this.page).toHaveURL(/input-form-demo/);
  }
}