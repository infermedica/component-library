/* eslint-disable import/prefer-default-export */
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import type { Component } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

type StoryImport<TArgs> = { default: Meta<TArgs> } & Record<string, StoryObj<TArgs>>;
export type StoryToMount<TArgs extends object> = (additionalArgs?: TArgs) => {
  wrapper: VueWrapper,
  component: VueWrapper,
  args: TArgs,
};
type StoryMap<
  TKeys extends string | number,
  TArgs extends object
> = Record<TKeys, StoryToMount<TArgs>>;

export const mountStories = <TArgs extends object>(
  component: Component, storiesImport: StoryImport<TArgs>, setWrapper: (story: VueWrapper) => void,
) => {
  const {
    default: meta, ...stories
  } = storiesImport;
  return Object.entries(stories).reduce((storiesMap: StoryMap<keyof typeof stories, TArgs>, [
    key,
    story,
  ]) => {
    const args = {
      ...(meta?.args || {}),
      ...(story?.args || {}),
    } as TArgs;
    const getMountedStory = (storyArgs: TArgs) => mount(
      story.render
        ? story.render(storyArgs, meta as any)
        : component as any,
      { props: storyArgs },
    );
    return {
      ...storiesMap,
      [key]: (additionalArgs) => {
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
  }, {});
};
