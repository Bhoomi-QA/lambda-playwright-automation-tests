export function sliderLocator(labelText: string) {
  return `//h4[contains(normalize-space(.), "${labelText}")]/following-sibling::div//input[@type="range"]`;
}

export function sliderValueBoxLocator(labelText: string) {
  return `//h4[contains(normalize-space(.), "${labelText}")]/following-sibling::div//output`;
}