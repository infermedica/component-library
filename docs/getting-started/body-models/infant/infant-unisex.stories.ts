import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';
import InfantUnisexBack from './infant-unisex-back.svg?raw';
import InfantUnisexFront from './infant-unisex-front.svg?raw';
import '../styles.scss';
import { UiText } from '../../../../index';

const meta = {
  title: 'Getting Started/Body Models/Infant Unisex',
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

export const Front: StoryObj = {
  render() {
    return { template: InfantUnisexFront };
  },
};
Front.parameters = { source: { code: InfantUnisexFront } };

export const Back: StoryObj = {
  render() {
    return { template: InfantUnisexBack };
  },
};
Back.parameters = { source: { code: InfantUnisexBack } };
