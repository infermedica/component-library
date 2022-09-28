import UiContainer from '@/components/organisms/UiContainer/UiContainer.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { content } from '@sb/helpers/argTypes';

export default {
  title: 'Organisms/Container',
  component: UiContainer,
  args: { content: 'Please note that the information provided by this tool is provided solely for educational purposes and is not a qualified medical opinion. This information should not be considered advice or an opinion of a doctor or other health professional about your actual medical state, and you should see a doctor for any symptoms you may have. If you are experiencing a health emergency, you should call your local emergency number immediately to request emergency medical assistance.' },
  argTypes: { content },
};

const Template = (args) => ({
  components: {
    UiContainer,
    UiText,
  },
  setup() {
    return { ...args };
  },
  template: `<UiContainer 
    class="max-w-195"
  >
    <UiText style="--text-color: var(--color-text-dimmed)">
      Please note that the information provided by this tool is provided solely for educational purposes and is not a qualified medical opinion. This information should not be considered advice or an opinion of a doctor or other health professional about your actual medical state, and you should see a doctor for any symptoms you may have. If you are experiencing a health emergency, you should call your local emergency number immediately to request emergency medical assistance.
    </UiText>
  </UiContainer>`,
});

export const WithDisclaimer = Template.bind({});

