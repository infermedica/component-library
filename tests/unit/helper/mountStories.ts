/* eslint-disable import/prefer-default-export */
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import type { Component } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

type ReturnTypeMountedStory<T> = () => {
  component: VueWrapper,
  args: T,
};

export const mountStories = <StoryImport extends {default: Meta} & Record<string, StoryObj>>(
  component: Component, storiesImport: StoryImport, setWrapper: (story: VueWrapper) => void,
) => {
  const {
    default: meta, ...stories
  } = storiesImport;
  return Object.entries(stories).reduce((storiesMap, [
    key,
    story,
  ]: [
    string,
    Required<StoryObj>
  ]) => {
    const args: typeof story['args'] = {
      ...(meta?.args || {}),
      ...(story?.args || {}),
    };
    const mountedStory: VueWrapper = mount(story.render(
      args,
      meta as any,
    ) as any, { props: args });
    return {
      ...storiesMap,
      [key]: () => {
        setWrapper(mountedStory);
        return {
          component: mountedStory.findComponent(component),
          args,
        };
      },
    };
  }, {} as Record<keyof typeof stories, ReturnTypeMountedStory<typeof stories[keyof typeof stories]['args']>>);
};
