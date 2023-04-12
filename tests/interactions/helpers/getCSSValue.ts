/* eslint-disable import/prefer-default-export */
const hexToRgb = (hex: string) => {
  let value = hex.trim().replace('#', '');
  if (value.length === 3) {
    value = value.split('').map((d) => `${d}${d}`).join('');
  }
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

export const getCSSValue = (variable: string) => (
  getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .replaceAll(/ #(?:[0-9a-fA-F]{3}){1,2}\b/g, (hex) => hexToRgb(hex))
    .trim()
);
