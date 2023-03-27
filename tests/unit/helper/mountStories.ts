/* eslint-disable import/prefer-default-export */
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import type { ConcreteComponent } from 'vue';
import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

type ReturnTypeMountedStory<T> = () => {
  component: VueWrapper,
  args: T,
};

export const mountStories = <StoryImport extends {default: Meta} & Record<string, StoryObj>>(
  component: ConcreteComponent, storiesImport: StoryImport, setWrapper: (story: VueWrapper) => void,
) => {
  const {
    default: meta, ...stories
  } = storiesImport;

  type Stories = typeof stories;
  type StoriesName = keyof Stories;

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
    const storyAsComponent = story.render(
      args,
      meta as any,
    );
    const componentToMount = {
      ...storyAsComponent,
      emits: {
        ...component.emits,
        ...storyAsComponent.emits,
      },
      props: {
        ...component.props,
        ...storyAsComponent,
      },
    };
    const mountedStory: VueWrapper = mount(componentToMount, { props: args });
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
  }, {} as Record<StoriesName, ReturnTypeMountedStory<Stories[StoriesName]['args']>>);
};
