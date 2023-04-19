/* eslint-disable import/prefer-default-export */
import type {
  DOMWrapper,
  VueWrapper,
} from '@vue/test-utils';
import type { StoryToMount } from './mountStories';
import { getBindingTest } from './getBindingTest';

type SlotTestCase<TArgs extends object> = {
  story: ReturnType<StoryToMount<TArgs>>;
  slot: string;
  content: (story: VueWrapper) => VueWrapper | DOMWrapper<Element>;
  expectedBinding?: (args: TArgs) => object | undefined,
}

export const getSlotTests = <TArgs extends object>(
  testCases: SlotTestCase<TArgs>[],
) => {
  testCases.forEach(({
    slot,
    story,
    content,
    expectedBinding,
  }) => {
    describe(`${slot} slot`, () => {
      test(`render a content via ${slot} slot`, async () => {
        const { wrapper } = story;
        expect(await content(wrapper).exists()).toBe(true);
      });
      if (expectedBinding) {
        test(`pass attributes to the ${slot} slot element`, async () => {
          const {
            args, wrapper,
          } = story;
          const element = content(wrapper);
          if ('vm' in element) {
            getBindingTest(element, expectedBinding(args));
          }
        });
      }
    });
  });
};
