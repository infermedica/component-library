/* eslint-disable import/prefer-default-export */
import type {
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/vue3';
import type { ComponentPublicInstance } from 'vue';

export const mountStories = <T extends {default: Meta} & Record<string, StoryObj>>(
  storiesImport: T,
) => {
  const {
    default: meta, ...stories
  } = storiesImport;
  return Object.entries(stories).reduce(
    (storiesMap, [
      key,
      story,
    ]: [
      string,
      Required<StoryObj>
    ]) => ({
      ...storiesMap,
      [key]: () => story.render(
        {
          ...(meta?.args || {}),
          ...(story?.args || {}),
        },
        meta as StoryContext,
      ),
    }),
    {} as Record<keyof typeof stories, () => ComponentPublicInstance>,
  );
};
