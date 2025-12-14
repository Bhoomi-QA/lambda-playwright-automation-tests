import { Page, expect } from "@playwright/test";
import {
  sliderLocator,
  sliderValueBoxLocator,
} from "../locator/DragDropLocators";

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
    // Read output safely (may be null or non-numeric in some environments)
    const readOutput = async () => {
      const txt = await output.textContent();
      if (!txt) return NaN;
      const n = Number(txt.trim());
      return Number.isFinite(n) ? n : NaN;
    };

    // If the page/context is closed, fail early with helpful message
    if (this.page.isClosed())
      throw new Error("Page is already closed before setting slider");

    // Try to set the value programmatically first and dispatch events (more reliable remotely)
    try {
      await slider.evaluate((el, v) => {
        const input = el as HTMLInputElement;
        input.value = String(v);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }, value);
    } catch (e) {
      // ignore and fall back to keyboard interaction
    }

    // Poll until output updates or timeout
    const deadline = Date.now() + 10_000;
    let currentVal = await readOutput();
    while (Date.now() < deadline && currentVal !== value) {
      if (this.page.isClosed())
        throw new Error("Page closed while updating slider");
      // small nudge with keyboard in case programmatic set didn't update UI
      try {
        if (Number.isNaN(currentVal)) {
          await slider.press("ArrowRight");
        } else if (currentVal < value) {
          await slider.press("ArrowRight");
        } else if (currentVal > value) {
          await slider.press("ArrowLeft");
        }
      } catch (err) {
        // if the target was closed while pressing, rethrow with context
        if (this.page.isClosed())
          throw new Error("Page closed during slider key presses");
        // otherwise ignore and continue polling
      }
      await this.page.waitForTimeout(20);
      currentVal = await readOutput();
    }

    await expect(output).toHaveText(String(value), { timeout: 11_000 });
  }
}
