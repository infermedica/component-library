/* eslint-disable import/prefer-default-export */
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import type { Component } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

type StoryFileImports<TKeys extends string, TArgs> = { default: Meta<TArgs> } & Record<TKeys, StoryObj<TArgs>>;
export type StoryToMount<TArgs extends object> = (additionalArgs?: Partial<TArgs>) => {
  wrapper: VueWrapper,
  component: VueWrapper,
  args: TArgs,
};
type StoryMap<
  TKeys extends string,
  TArgs extends object
> = Record<Exclude<TKeys, 'default'>, StoryToMount<TArgs>>;

export const mountStories = <TArgs extends object, TKeys extends string>(
  component: Component,
  imports: StoryFileImports<TKeys, TArgs>,
  setWrapper: (story: VueWrapper) => void,
) => {
  const {
    default: meta,
    ...stories
  } = imports;
  return Object.entries<StoryObj<TArgs>>(stories).reduce((storiesMap, [
    key,
    story,
  ]) => {
    const args = {
      ...meta.args,
      ...story.args,
    } as TArgs;
    const getMountedStory = (storyArgs: TArgs) => mount(
      story.render
        ? story.render(storyArgs, meta as any)
        : component as any,
      { props: storyArgs },
    );
    return {
      ...storiesMap,
      [key]: (additionalArgs?: TArgs) => {
        const mountedStory = getMountedStory({
          ...args,
          ...additionalArgs,
        });
        setWrapper(mountedStory);
        return {
          wrapper: mountedStory,
          component: mountedStory.findComponent(component),
          args: {
            ...args,
            ...additionalArgs,
          },
        };
      },
    };
  }, {} as StoryMap<TKeys, TArgs>);
};
