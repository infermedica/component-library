/* eslint-disable import/prefer-default-export */
import type { VueWrapper } from '@vue/test-utils';
import type { StoryToMount } from './mountStories';

type EmitTestCase<TArgs extends object> = {
  name: string,
  story: ReturnType<StoryToMount<TArgs>>,
  action: (story: VueWrapper) => Promise<void>,
  expected: ((args: TArgs) => TArgs[keyof TArgs]) | Required<TArgs[keyof TArgs]>,
}

export const getEmitTests = async <TArgs extends object>(
  emit: string,
  testCases: EmitTestCase<TArgs>[],
) => {
  describe(`${emit} emit`, () => {
    testCases.forEach(({
      name, expected, story, action,
    }) => {
      test(name, async () => {
        const {
          component, args, wrapper,
        } = story;
        await action(component);
        const emittedValue = component.emitted(emit)?.at(0)?.at(0);
        expect(emittedValue).toStrictEqual(
          typeof expected === 'function'
            ? expected(args)
            : expected,
        );
        wrapper.unmount();
      });
    });
  });
};
