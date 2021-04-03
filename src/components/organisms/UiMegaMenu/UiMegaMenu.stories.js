import UiMegaMenu from '@/components/organisms/UiMegaMenu/UiMegaMenu.vue';
import UiMegaMenuItem from '@/components/organisms/UiMegaMenu/_internal/UiMegaMenuItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';

export default {
  title: 'Organisms/MegaMenu',
  component: UiMegaMenu,
  subcomponents: { UiMegaMenu, UiMegaMenuItem },
  args: {
    items: [
      {
        title: 'For business',
        name: 'for-business',
        content: 'Symptomate is developed by Infermedica – the company that creates AI tools for preliminary medical diagnosis and triage:',
      },
      {
        title: 'CE Marking',
        name: 'ce-marking',
        content: 'Symptomate',
      },
      {
        title: 'Instruction fo Use',
        name: 'instruction',
        href: 'https://infermedica.com/',
      },
      {
        title: 'Terms of Service',
        name: 'terms',
        content: '§1. General Provisions',
      },
      {
        title: 'Privacy Policy',
        name: 'privacy',
        content: 'Who we are',
      },
    ],
  },
  argTypes: {
    modelValue: {
      control: false,
    },
  },
};

const Template = (args) => ({
  components: {
    UiMegaMenu, UiMegaMenuItem, UiButton, UiIcon, UiText,
  },
  setup() {
    const modelValue = ref('');
    return { ...args, modelValue };
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
                {{title}}
                <UiIcon icon="chevronRight"/>
              </UiButton>
            </template>
            <template v-else>
              <UiButton
                v-if="hasControls"
                class="ui-button--text ui-button--has-icon"
                style="--button-justify-content: space-between; --button-width: 100%; --button-padding: var(--space-8) var(--space-12)"
                @click="to"
              >
                {{title}}
                <UiIcon icon="chevronRight"/>
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
              <UiIcon icon="chevronLeft"/>
              Back to menu
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
