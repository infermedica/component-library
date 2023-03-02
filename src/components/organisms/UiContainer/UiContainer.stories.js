import UiContainer from '@/components/organisms/UiContainer/UiContainer.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { content } from '@sb/helpers/argTypes';
import './UiContainer.stories.scss';

export default {
  title: 'Organisms/Container',
  component: UiContainer,
  args: {
    content:
      'Please note that the information provided by this tool is provided solely for educational purposes and is not a qualified medical opinion. This information should not be considered advice or an opinion of a doctor or other health professional about your actual medical state, and you should see a doctor for any symptoms you may have. If you are experiencing a health emergency, you should call your local emergency number immediately to request emergency medical assistance.',
  },
  argTypes: { content },
  parameters: {
    cssProperties: {
      '--container-padding-block':
        'var(--container-padding-block-start, var(--space-32)) var(--container-padding-block-end, var(--space-32))',
      '--container-padding-inline':
        'var(--container-padding-inline-start, var(--space-20)) var(--container-padding-inline-end, var(--space-20))',
      '--container-border-start-start-radius': '0',
      '--container-border-start-end-radius': '0',
      '--container-border-end-start-radius': '0',
      '--container-border-end-end-radius': '0',
      '--container-background': 'var(--color-background-white)',
      '--container-box-shadow': 'var(--box-shadow-low)',
      '--container-tablet-padding-block':
        'var(--container-tablet-padding-block-start, var(--space-48)) var(--container-tablet-padding-block-end, var(--space-48))',
      '--container-tablet-padding-inline':
        'var(--container-tablet-padding-inline-start, var(--space-48)) var(--container-tablet-padding-inline-end, var(--space-48))',
      '--container-tablet-border-start-start-radius': 'var(--border-radius-container)',
      '--container-tablet-border-start-end-radius': 'var(--border-radius-container)',
      '--container-tablet-border-end-start-radius': 'var(--border-radius-container)',
      '--container-tablet-border-end-end-radius': 'var(--border-radius-container)',
      '--container-desktop-padding-block':
        'var(--container-desktop-padding-block-start, var(--space-48)) var(--container-desktop-padding-block-end, var(--space-48))',
      '--container-desktop-padding-inline':
        'var(--container-desktop-padding-inline-start, var(--space-64)) var(--container-desktop-padding-inline-end, var(--space-64))',
    },
  },
};

export const WithDisclaimer = {
  render: (args) => ({
    components: {
      UiContainer,
      UiText,
    },
    setup() {
      return { ...args };
    },
    template: `<UiContainer class="container-disclaimer">
      <UiText class="container-disclaimer__disclaimer">
        Please note that the information provided by this tool is provided solely for educational purposes and is not a qualified medical opinion. This information should not be considered advice or an opinion of a doctor or other health professional about your actual medical state, and you should see a doctor for any symptoms you may have. If you are experiencing a health emergency, you should call your local emergency number immediately to request emergency medical assistance.
      </UiText>
    </UiContainer>`,
  }),
};
