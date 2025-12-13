import { Page, expect } from "@playwright/test";
import {
  NAME_INPUT,
  EMAIL_INPUT,
  PASSWORD_INPUT,
  COMPANY_INPUT,
  WEBSITE_INPUT,
  CITY_INPUT,
  ADDRESS1_INPUT,
  ADDRESS2_INPUT,
  STATE_INPUT,
  ZIP_INPUT,
  SUBMIT_BUTTON,
  SUCCESS_TEXT,
} from "../locator/InputFormLocator";

export class InputFormPage {
  constructor(private page: Page) {}

  /**
   * Click Submit with empty fields, and verify validation is triggered
   * and the Name input is required.
   */
  async submitEmptyAndExpectValidation() {
    // Click submit
    await this.page
      .getByRole(SUBMIT_BUTTON.role as "button", { name: SUBMIT_BUTTON.name })
      .click();

    // Ensure the element is present/visible before asserting
    const firstName = this.page.locator(NAME_INPUT);
    await firstName.waitFor({ state: "visible", timeout: 5000 });

    // Robust required check: use DOM property instead of attribute
    await expect(firstName).toHaveJSProperty("required", true);

    // Optional (recommended): assert the native validation message
    // This reads the browser's message "Please fill out this field."
    const msg = await firstName.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(msg).toBe("Please fill out this field.");
  }

  /**
   * Fill the entire form. Country selection is done by visible text ("United States").
   */
  async fillForm(data: {
    name: string;
    email: string;
    password: string;
    company: string;
    website: string;
    country: string; // e.g., "United States"
    city: string;
    address1: string;
    address2: string;
    state: string;
    zip: string;
  }) {
    await this.page.locator(NAME_INPUT).fill(data.name);
    await this.page.locator(EMAIL_INPUT).fill(data.email);
    await this.page.locator(PASSWORD_INPUT).fill(data.password);
    await this.page.locator(COMPANY_INPUT).fill(data.company);
    await this.page.locator(WEBSITE_INPUT).fill(data.website);

    // ---- Country selection (native <select>) ----
    // Prefer the accessible label "Country*" if available
    const byLabel = this.page.getByLabel(/Country\*/i).first();
    if ((await byLabel.count()) > 0) {
      await byLabel.waitFor({ state: "visible", timeout: 5000 });
      await byLabel.selectOption({ label: data.country });

      // Verify selected text
      const selectedText = await byLabel.evaluate(
        (el: HTMLSelectElement) => el.options[el.selectedIndex]?.text || ""
      );
      expect(selectedText.trim()).toBe(data.country);
    } else {
      // Fallback: use the explicit selector from your HTML: <select name="country">
      const countrySelect = this.page.locator('select[name="country"]').first();
      await countrySelect.waitFor({ state: "visible", timeout: 5000 });
      await countrySelect.selectOption({ label: data.country });

      const selectedText = await countrySelect.evaluate(
        (el: HTMLSelectElement) => el.options[el.selectedIndex]?.text || ""
      );
      expect(selectedText.trim()).toBe(data.country);
    }
    // ---- end country selection ----

    await this.page.locator(CITY_INPUT).fill(data.city);
    await this.page.locator(ADDRESS1_INPUT).fill(data.address1);
    await this.page.locator(ADDRESS2_INPUT).fill(data.address2);
    await this.page.locator(STATE_INPUT).fill(data.state);
    await this.page.locator(ZIP_INPUT).fill(data.zip);
  }

  /**
   * Submit and assert success copy is visible.
   */
  async submitAndExpectSuccess() {
    await this.page
      .getByRole(SUBMIT_BUTTON.role as "button", { name: SUBMIT_BUTTON.name })
      .click();

    // Wait for success feedback to render
    // If SUCCESS_TEXT is a literal message string:
    if (typeof SUCCESS_TEXT === "string") {
      await expect(
        this.page.getByText(SUCCESS_TEXT, { exact: true })
      ).toBeVisible();
    } else {
      // If SUCCESS_TEXT is a locator/selector:
      await expect(this.page.locator(SUCCESS_TEXT as any)).toBeVisible();
    }
  }
}
