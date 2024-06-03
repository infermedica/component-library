import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import ToddlerMaleFront from './toddler-male-front.svg?raw';
import ToddlerMaleBack from './toddler-male-back.svg?raw';
import ToddlerFemaleFront from './toddler-female-front.svg?raw';
import ToddlerFemaleBack from './toddler-female-back.svg?raw';
import '../styles.scss';
import { UiText } from '../../../../index';

const meta = {
  title: 'Getting Started/Body Models/Toddler',
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
    return { template: ToddlerMaleFront };
  },
};
MaleFront.parameters = { source: { code: ToddlerMaleFront } };

export const MaleBack: StoryObj = {
  render() {
    return { template: ToddlerMaleBack };
  },
};
MaleBack.parameters = { source: { code: ToddlerMaleBack } };

export const FemaleFront: StoryObj = {
  render() {
    return { template: ToddlerFemaleFront };
  },
};
FemaleFront.parameters = { source: { code: ToddlerFemaleFront } };

export const FemaleBack: StoryObj = {
  render() {
    return { template: ToddlerFemaleBack };
  },
};
FemaleBack.parameters = { source: { code: ToddlerFemaleBack } };
