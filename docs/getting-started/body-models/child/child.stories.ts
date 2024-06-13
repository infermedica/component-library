import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import ChildMaleFront from './child-male-front.svg?raw';
import ChildMaleBack from './child-male-back.svg?raw';
import ChildFemaleFront from './child-female-front.svg?raw';
import ChildFemaleBack from './child-female-back.svg?raw';
import '../styles.scss';
import { UiText } from '../../../../index';

const meta = {
  title: 'Getting Started/Body Models/Child',
  tags: [ '!autodocs' ],
  decorators: [ () => ({
    components: { UiText },
    template: `<div class="flex gap-8">
      <div class="flex flex-col gap-4"><UiText>copied svg</UiText><story/></div>
      <div class="flex flex-col gap-4 has-styles"><UiText>svg with styles</UiText><story/></div>
    </div>`,
  }) ],
} satisfies Meta;
export default meta;

export const MaleFront: StoryObj = {
  render() {
    return { template: ChildMaleFront };
  },
};
MaleFront.parameters = { source: { code: ChildMaleFront } };

export const MaleBack: StoryObj = {
  render() {
    return { template: ChildMaleBack };
  },
};
MaleBack.parameters = { source: { code: ChildMaleBack } };

export const FemaleFront: StoryObj = {
  render() {
    return { template: ChildFemaleFront };
  },
};
FemaleFront.parameters = { source: { code: ChildFemaleFront } };

export const FemaleBack: StoryObj = {
  render() {
    return { template: ChildFemaleBack };
  },
};
FemaleBack.parameters = { source: { code: ChildFemaleBack } };
