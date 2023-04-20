/* eslint-disable import/prefer-default-export */
import type { VueWrapper } from '@vue/test-utils';
import type { Attrs } from '@/types';

export const getBindingTest = (
  element: VueWrapper,
  expected?: object,
) => {
  if (!expected) return;
  const results: Attrs = {
    ...element.vm.$attrs,
    ...element.vm.$props,
  };
  Object.entries(expected).forEach(([
    key,
    value,
  ]) => {
    if (key === 'class') {
      expect(results.class.includes(value)).toBe(true);
    } else {
      expect(results[key]).toStrictEqual(value);
    }
  });
};
