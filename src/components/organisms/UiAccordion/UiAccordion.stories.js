import UiAccordion from '@/components/organisms/UiAccordion/UiAccordion.vue';
import UiAccordionItem from '@/components/organisms/UiAccordion/_internal/UiAccordionItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';

export default {
  title: 'Organisms/Accordion',
  component: UiAccordion,
  subcomponents: {
    UiAccordionItem,
  },
  args: {
    content: {
      mortphology: 'Serum uric acid concentration',
      rheumatology: '1. Erythrocyte Sedimentation Rate',
      inflammation: 'Rheumatoid factor',
    },
    initModelValue: '',
    items: [
      {
        name: 'mortphology',
        title: 'Mortphology',
      },
      {
        name: 'rheumatology',
        title: 'Rheumatology blood tests panel',
      },
      {
        name: 'inflammation',
        title: 'Inflammation panel',
      },
    ],
  },
  argTypes: {
    initModelValue: {
      description: 'Use this control to set the initial value.',
      table: {
        category: 'stories controls',
      },
      control: 'text',
    },
    content: {
      description: 'Use this control to set the content of the accordion items.',
      table: {
        category: 'stories controls',
      },
    },
    modelValue: {
      control: false,
    },
    accordionItem: {
      name: '<name>',
      description: 'Use this slot to replace accordion item content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: {
          summary: 'unknown',
        },
      },
    },
  },
};

const Template = (args) => ({
  components: {
    UiAccordion,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiAccordion
    v-model="modelValue"
    :items="items"
  >
    <template
      v-for="({name}, key) in items"
      #[name]="{item}"
      :key="key"
    >
      <UiText>{{content[item.name]}}</UiText>
    </template>
  </UiAccordion>`,
});

export const MultipleItems = Template.bind({
});

export const SingleItem = Template.bind({
});
SingleItem.args = {
  items: [{
    name: 'less',
    title: 'Less likely conditions',
    'data-testid': 'less',
    contentAttrs: {
      'data-testid': 'less-content',
    },
  }],
  content: {
    less: 'Serum uric acid concentration',
  },
};

export const MultipleItemsOpened = Template.bind({
});
MultipleItemsOpened.args = {
  initModelValue: [],
};
MultipleItemsOpened.argTypes = {
  initModelValue: {
    control: 'array',
  },
};

export const WithDefaultSlot = (args) => ({
  components: {
    UiAccordion,
    UiAccordionItem,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiAccordion 
    v-model="modelValue"
  >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiAccordionItem
        :name="item.name"
        :title="item.title"
        :settings="item.setting"
      >
        <UiText>{{content[item.name]}}</UiText>
      </UiAccordionItem>
    </template>
  </UiAccordion>`,
});

export const WithTogglerSlot = (args) => ({
  components: {
    UiAccordion,
    UiAccordionItem,
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
  template: `<UiAccordion 
    v-model="modelValue"
  >
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiAccordionItem
        :name="item.name"
        :title="item.title"
        :settings="item.setting"
      >
        <UiText>{{content[item.name]}}</UiText>
        <template #toggler="{toggle, name, icon, title, isOpen, iconOpen, iconClose}">
          <UiButton
              :id="'toggler' + name"
              :aria-expanded="isOpen.toString()"
              :aria-controls="name"
              class="ui-button--outlined ui-accordion-item__toggler"
              @click="toggle(name)"
          >
            <UiIcon
                :icon="icon"
                class="ui-button__icon ui-accordion-item__chevron"
            />
            {{ title }}
          </UiButton>
        </template>
      </UiAccordionItem>
    </template>
  </UiAccordion>`,
});

export const WithChevronSlot = (args) => ({
  components: {
    UiAccordion,
    UiAccordionItem,
    UiText,
    UiIcon,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiAccordion v-model="modelValue">
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiAccordionItem
        :name="item.name"
        :title="item.title"
      >
        <UiText>{{content[item.name]}}</UiText>
        <template #chevron="{isOpen, icon, iconOpen, iconClose}">
          <UiIcon
              :icon="icon"
              class="ui-button__icon ui-accordion-item__chevron"
          />
        </template>
      </UiAccordionItem>
    </template>
  </UiAccordion>`,
});

export const WithContentSlot = (args) => ({
  components: {
    UiAccordion,
    UiAccordionItem,
    UiText,
  },
  setup() {
    const modelValue = ref(args.initModelValue);
    return {
      ...args,
      modelValue,
    };
  },
  template: `<UiAccordion v-model="modelValue">
    <template
      v-for="(item, key) in items"
      :key="key"
    >
      <UiAccordionItem
        :name="item.name"
        :title="item.title"
      >
        <template #content="{isOpen, name}">
          <div
            v-show="isOpen"
            :id="name"
            role="region"
            :aria-labelledby="'toggler' + name"
            class="ui-accordion-item__content"
          >
            <UiText>{{content[item.name]}}</UiText>
          </div>
        </template>
      </UiAccordionItem>
    </template>
  </UiAccordion>`,
});
