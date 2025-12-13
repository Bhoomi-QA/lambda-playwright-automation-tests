import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { InputFormPage } from '../src/pages/InputFormPage';

test('Scenario 3: Input Form Submit end-to-end', async ({ page }) => {
  const home = new HomePage(page);
  const form = new InputFormPage(page);

  await home.goto();
  await home.openInputFormSubmit();

  await form.submitEmptyAndExpectValidation();

  await form.fillForm({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'Secret!234',
    company: 'Acme Inc.',
    website: 'acme.example',
    country: 'United States',
    city: 'New York',
    address1: '1 Main St',
    address2: 'Suite 100',
    state: 'NY',
    zip: '10001'
  });

  await form.submitAndExpectSuccess();
});
