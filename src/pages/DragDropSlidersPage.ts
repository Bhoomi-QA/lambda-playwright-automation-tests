import { Page, expect } from '@playwright/test';
import { sliderLocator, sliderValueBoxLocator } from '../locator/DragDropLocators';

export class DragDropSlidersPage {
  constructor(private page: Page) {}

  private sliderFor(labelText: string) {
    return this.page.locator(sliderLocator(labelText));
  }

  private sliderValueBox(labelText: string) {
    return this.page.locator(sliderValueBoxLocator(labelText));
  }

  async setSliderTo(labelText: string, value: number) {
    const slider = this.sliderFor(labelText);
    const output = this.sliderValueBox(labelText);

    await expect(slider).toBeVisible();
    await slider.focus();
    let currentVal = Number(await output.textContent());
    let tries = 0;

    while (currentVal !== value && tries < 200) {
      if (currentVal < value) {
        await slider.press('ArrowRight');
      } else {
        await slider.press('ArrowLeft');
      }
      currentVal = Number(await output.textContent());
      tries++;
    }

    await expect(output).toHaveText(String(value));
  }
}