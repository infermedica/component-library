import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import AdultMaleFront from './adult-male-front.svg?raw';
import AdultMaleBack from './adult-male-back.svg?raw';
import AdultFemaleFront from './adult-female-front.svg?raw';
import AdultFemaleBack from './adult-female-back.svg?raw';
import '../styles.scss';
import { UiText } from '../../../../index';

const meta = {
  title: 'Getting Started/Body Models/Adult',
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
    return { template: AdultMaleFront };
  },
};
MaleFront.parameters = { source: { code: AdultMaleFront } };

export const MaleBack: StoryObj = {
  render() {
    return { template: AdultMaleBack };
  },
};
MaleBack.parameters = { source: { code: AdultMaleBack } };

export const FemaleFront: StoryObj = {
  render() {
    return { template: AdultFemaleFront };
  },
};
FemaleFront.parameters = { source: { code: AdultFemaleFront } };

export const FemaleBack: StoryObj = {
  render() {
    return { template: AdultFemaleBack };
  },
};
FemaleBack.parameters = { source: { code: AdultFemaleBack } };
