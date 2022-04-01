import UiTabs from '@/components/organisms/UiTabs/UiTabs.vue';
import UiTabsItem from '@/components/organisms/UiTabs/_internal/UiTabsItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';
import { modifiers } from '@sb/helpers/argTypes';

export default {
  title: 'Organisms/Tabs',
  component: UiTabs,
  subcomponents: { UiTabsItem, UiButton },
  args: {
    tabs: [
      {
        title: 'Search',
        name: 'search',
        content: 'Serum uric acid concentration',
      },
      {
        title: 'Point on the body',
        name: 'point',
        content: '1. Erythrocyte Sedimentation Rate',
      },
    ],
    initModelValue: 'search',
    modifiers: [],
  },
  argTypes: {
    tabs: {
      description: 'Use this control to set tabs.',
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
    modifiers: modifiers({ options: ['ui-tabs--fixed'] }),
    modelValue: {
      control: false,
    },
  },
  decorators: [() => ({ template: '<div style="min-height: 120px"><story /></div>' })],
  parameters: {
    cssprops: {
      'tabs-padding': {
        value: '0',
        control: 'text',
        description: '',
      },
      'tabs-divider-gap-y': {
        value: '55px',
        control: 'text',
        description: '',
      },
      'tabs-underline-border': {
        value: 'var(--color-border-divider)',
        control: 'text',
        description: '',
      },
      'tabs-underline-width': {
        value: '100%',
        control: 'text',
        description: '',
      },
      'tabs-underline-color': {
        value: 'var(--color-border-selection)',
        control: 'text',
        description: '',
      },
      'tabs-item-tab-fixed-margin': {
        value: '0',
        control: 'text',
        description: '',
      },
      'tabs-item-tab-fixed-padding': {
        value: 'var(--space-16) var(--space-8)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiTabs, UiTabsItem, UiText },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiTabs 
    v-model="modelValue"
    :class="modifiers"
  >
    <template v-for="({name, title, content}, key) in tabs" :key="key">
      <UiTabsItem 
        :name="name" 
        :title="title"
      >
        <UiText>{{content}}</UiText>
      </UiTabsItem>
    </template>
  </UiTabs>`,
});

export const Common = Template.bind({});

export const Fixed = Template.bind({});
Fixed.args = {
  modifiers: ['ui-tabs--fixed'],
};

export const AsInTheDesign = (args) => ({
  components: { UiTabs, UiTabsItem, UiText },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiTabs
    v-model="modelValue"
    :class="modifiers"
    style="--tabs-padding: 0 var(--space-20); --tabs-underline-x-default: var(--space-20);"
  >
    <template v-for="({name, title, content}, key) in tabs" :key="key">
      <UiTabsItem
        :name="name"
        :title="title"
      >
        <UiText>{{content}}</UiText>
      </UiTabsItem>
    </template>
  </UiTabs>`,
});
AsInTheDesign.parameters = {
  layout: 'fullscreen',
};

export const WithTogglerSlot = (args) => ({
  components: {
    UiTabs, UiTabsItem, UiText, UiButton,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: 'Oops! Not found!',
  // template: `<UiTabs
  //   v-model="modelValue"
  //   :class="modifiers"
  // >
  //   <template
  //     v-for="({name, title, content}, key) in tabs"
  //     :key="key"
  //   >
  //     <UiTabsItem
  //       :name="name"
  //       :title="title"
  //     >
  //       <template #toggler="{toggle, name, title, isOpen}">
  //         <!-- fixme: how to handle ref in slots -->
  //         <div
  //           ref="tab"
  //           class="ui-tabs-item__tab"
  //         >
  //           <UiButton
  //             :id="'toggler' + name"
  //             :aria-expanded="isOpen.toString()"
  //             :aria-controls="name"
  //             class="ui-tabs-item__tab-button ui-button--text"
  //             :class="{'ui-tabs-item__tab-button--active': isOpen}"
  //             @click="toggle(name)"
  //           >
  //             {{ title }}
  //           </UiButton>
  //         </div>
  //       </template>
  //       <UiText>{{content}}</UiText>
  //     </UiTabsItem>
  //   </template>
  // </UiTabs>`,
});

export const WithContentSlot = (args) => ({
  components: {
    UiTabs, UiTabsItem, UiText, UiButton,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return { ...args, modelValue };
  },
  template: `<UiTabs
    v-model="modelValue"
    :class="modifiers"
  >
    <template
      v-for="({name, title, content}, key) in tabs"
      :key="key"
    >
      <UiTabsItem
        :name="name"
        :title="title"
      >
        <template #content="{isOpen, name, attrs}">
          <div
            v-show="isOpen"
            :id="name"
            role="region"
            :aria-labelledby="'toggler' + name"
            class="ui-tabs-item__content"
            v-bind="attrs"
          >
            <UiText>{{content}}</UiText>
          </div>
        </template>
      </UiTabsItem>
    </template>
  </UiTabs>`,
});
