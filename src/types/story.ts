import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

type StoryControls<ModelValue = undefined> = {
  content?: string;
  class?: string[] | string | Record<string, boolean>;
  placeholder?: string;
  disabled?: boolean;
  items?: ModelValue;
}

export type StoryMeta<Props extends { modelValue?: unknown}> = Meta<Props & StoryControls<Props['modelValue']>>;
export type Story<Props extends {modelValue?: unknown}> = StoryObj<Props & StoryControls<Props['modelValue']>>;
