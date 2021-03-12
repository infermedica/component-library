import UiText from '@/components/atoms/UiText/UiText.vue';

export default {
  title: 'Atoms/Text',
  components: { UiText },
  args: {
    content: 'It looks like you are using an outdated browser that is having trouble viewing modern web pages. To proceed, download and install the latest version of your favorite browser:',
    tag: 'p',
  },
  argTypes: {
    content: { control: 'text' },
    tag: { control: 'text', table: { category: 'HTML Attributes' } },
  },
};

const Template = (args) => ({
  components: { UiText },
  setup() { return { ...args }; },
  template: `<UiText :tag="tag">
    {{content}}  
  </UiText>`,
});

export const TextAsParagraph = Template.bind({});
