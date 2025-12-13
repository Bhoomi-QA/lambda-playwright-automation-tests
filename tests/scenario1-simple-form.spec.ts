import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { SimpleFormPage } from '../src/pages/SimpleFormPage';

test('Scenario 1: Simple Form Demo message echo', async ({ page }) => {
  const home = new HomePage(page);
  const simple = new SimpleFormPage(page);

  await home.goto();
  await home.openSimpleFormDemo();

  const message = 'Welcome to LambdaTest';
  await simple.enterMessage(message);
  await simple.showMessage();
  await simple.expectMessage(message);
});
