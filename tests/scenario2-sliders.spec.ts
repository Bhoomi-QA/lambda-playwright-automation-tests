import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { DragDropSlidersPage } from '../src/pages/DragDropSlidersPage';

test('Scenario 2: Drag & Drop slider to 95', async ({ page }) => {
  const home = new HomePage(page);
  const sliders = new DragDropSlidersPage(page);

  await home.goto();
  await home.openDragDropSliders();
  await sliders.setSliderTo('Default value 15', 95);
});
