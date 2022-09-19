import { ref } from 'vue';
import UiMegaMenu from '@/components/organisms/UiMegaMenu/UiMegaMenu.vue';
import UiMegaMenuItem from '@/components/organisms/UiMegaMenu/_internal/UiMegaMenuItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';

export default {
  title: 'Organisms/MegaMenu',
  component: UiMegaMenu,
  subcomponents: {
    UiMegaMenuItem,
  },
  args: {
    items: [
      {
        title: 'For business',
        name: 'for-business',
        content: 'Triage is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:',
      },
      {
        title: 'CE Marking',
        name: 'ce-marking',
        content: 'Triage',
      },
      {
        title: 'Instruction fo Use',
        name: 'instruction',
        href: 'https://infermedica.com/',
      },
    ],
    initModelValue: '',
  },
  argTypes: {
    items: {
      description: 'Use this control to set the items.',
      table: {
        category: 'stories controls',
      },
      control: 'array',
    },
    initModelValue: {
      description: 'Use this control to set initial state.',
      table: {
        category: 'stories controls',
      },
      control: 'text',
    },
    modelValue: {
      control: false,
    },
  },
};

const Template = (args) => ({
  components: {
    UiMegaMenu,
    UiMegaMenuItem,
    UiButton,
    UiIcon,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiMegaMenu v-model="modelValue">
    <template v-for="({title, name, href, content}, key) in items" :key="key">
      <UiMegaMenuItem
        :title="title"
        :name="name"
      >
        <template #trigger="{title, to, hasControls}">
          <div style="margin: var(--space-8) 0; padding: 0 var(--space-8)">
            <template v-if="href">
              <UiButton
                v-if="hasControls"
                :href="href"
                class="ui-button--text ui-button--has-icon"
                style="--button-justify-content: space-between; --button-width: 100%; --button-padding: var(--space-8) var(--space-12)"
              >
                {{title}}<UiIcon icon="chevron-right"/>
              </UiButton>
            </template>
            <template v-else>
              <UiButton
                v-if="hasControls"
                class="ui-button--text ui-button--has-icon"
                style="--button-justify-content: space-between; --button-width: 100%; --button-padding: var(--space-8) var(--space-12)"
                @click="to"
              >
                {{title}}<UiIcon icon="chevron-right"/>
              </UiButton>
            </template>
          </div>
        </template>
        <template #default="{back}">
          <div style="padding: 0 var(--space-8)">
            <UiButton
              class="ui-button--text ui-button--has-icon"
              @click="back"
            >
              <UiIcon icon="chevron-left"/>Back to menu
            </UiButton>
            <UiText tag="p">{{content}}</UiText>
          </div>
        </template>
      </UiMegaMenuItem>
    </template>
  </UiMegaMenu>`,
});

export const Common = Template.bind({});
Common.parameters = {
  layout: 'fullscreen',
};
