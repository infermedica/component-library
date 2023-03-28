import { expect } from '@storybook/jest';

const hexToRgb = (hex: string) => {
  let value = hex.trim().replace('#', '')
  if (value.length === 3) {
    value = value.split('').map(d => `${d}${d}`).join('');
  }
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

export const getCSSValue = (variable: string) => (
  getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .replaceAll(/ #(?:[0-9a-fA-F]{3}){1,2}\b/g, (hex) => hexToRgb(hex))
    .trim()
);

export const haveStyles = (
  elements: Element[],
  property: keyof CSSStyleDeclaration,
  results: Partial<CSSStyleDeclaration>[],
  pseudo?: string
) => {
  results.forEach((result, index: number) => {
    expect(
      window.getComputedStyle(elements[index], pseudo)[property]
    ).toBe(result[property]?.toString());
  })
}