import { Page, expect } from "@playwright/test";
import {
  NAME_INPUT,
  EMAIL_INPUT,
  PASSWORD_INPUT,
  COMPANY_INPUT,
  WEBSITE_INPUT,
  COUNTRY_COMBOBOX,
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

  async submitEmptyAndExpectValidation() {
    await this.page
      .getByRole(SUBMIT_BUTTON.role as "button", { name: SUBMIT_BUTTON.name })
      .click();
    const firstName = this.page.locator(NAME_INPUT);
    const attr = await firstName.getAttribute("required");
    expect(attr).not.toBeNull();
  }

  async fillForm(data: {
    name: string;
    email: string;
    password: string;
    company: string;
    website: string;
    country: string;
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
    // Robust country selection: try role-based combobox first, then fall back to a native <select>
    const roleLocator = this.page
      .getByRole(COUNTRY_COMBOBOX.role as "combobox", {
        name: COUNTRY_COMBOBOX.name,
      })
      .first();
    try {
      await roleLocator.waitFor({ state: "visible", timeout: 3000 });
      await roleLocator.selectOption({ label: data.country });
    } catch (err) {
      // fallback to native <select>
      const select = this.page.getByTestId("select").first();
      try {
        await select.waitFor({ state: "visible", timeout: 3000 });
        // inspect available options for better error messages
        const options: { value: string; label: string }[] =
          await select.evaluate((el) =>
            Array.from((el as HTMLSelectElement).options).map((o) => ({
              value: o.value,
              label: o.text,
            }))
          );

        // try select by label first
        const matched = options.find(
          (o) =>
            o.label.trim().toLowerCase() === data.country.trim().toLowerCase()
        );
        if (matched) {
          await select.selectOption(matched.value);
        } else {
          // try selecting by label using Playwright (may work even if value mismatch)
          await select.selectOption({ label: data.country }).catch(() => {});
          // verify selection
          const selected = await select.inputValue();
          if (!selected) {
            throw new Error(
              `Country option not found: requested='${
                data.country
              }'. Available options: ${options.map((o) => o.label).join(", ")}`
            );
          }
        }
      } catch (err2) {
        throw new Error(
          `Failed to select country '${data.country}': ${
            err2 instanceof Error ? err2.message : String(err2)
          }`
        );
      }
    }
    await this.page.locator(CITY_INPUT).fill(data.city);
    await this.page.locator(ADDRESS1_INPUT).fill(data.address1);
    await this.page.locator(ADDRESS2_INPUT).fill(data.address2);
    await this.page.locator(STATE_INPUT).fill(data.state);
    await this.page.locator(ZIP_INPUT).fill(data.zip);
  }

  async submitAndExpectSuccess() {
    await this.page
      .getByRole(SUBMIT_BUTTON.role as "button", { name: SUBMIT_BUTTON.name })
      .click();
    await expect(this.page.getByText(SUCCESS_TEXT)).toBeVisible();
  }
}
