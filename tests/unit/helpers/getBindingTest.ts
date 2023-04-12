/* eslint-disable import/prefer-default-export */
import type { VueWrapper } from '@vue/test-utils';
import type { Attrs } from '@/types';

export const getBindingTest = <TBinding extends object>(
  element: VueWrapper,
  expected: TBinding,
) => {
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
