/* eslint-disable import/prefer-default-export */
import { expect } from '@storybook/jest';

export const getStyleTests = (
  elements: Element[],
  property: keyof CSSStyleDeclaration,
  results: Partial<CSSStyleDeclaration>[],
  pseudo?: string,
) => {
  results.forEach((result, index: number) => {
    expect(
      window.getComputedStyle(elements[index], pseudo)[property],
    ).toBe(result[property]?.toString());
  });
};
