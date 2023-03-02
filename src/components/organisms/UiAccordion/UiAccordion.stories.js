import UiAccordion from '@/components/organisms/UiAccordion/UiAccordion.vue';
import UiAccordionItem from '@/components/organisms/UiAccordion/_internal/UiAccordionItem.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { ref } from 'vue';
import { actions } from '@storybook/addon-actions';
import { Deselectable } from '@/components/molecules/UiToggleButtonGroup/UiToggleButtonGroup.stories';

const events = actions({ onUpdateModelValue: 'update:modelValue' });

export default {
  title: 'Organisms/Accordion',
  component: UiAccordion,
  subcomponents: { UiAccordionItem },
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
      table: { category: 'stories controls' },
      control: 'text',
    },
    content: {
      description: 'Use this control to set the content of the accordion items.',
      table: { category: 'stories controls' },
    },
    modelValue: { control: false },
    accordionItem: {
      name: '<name>',
      description:
        'Use this slot to replace accordion item content. Require `name` in item object.',
      table: {
        category: 'slots',
        type: { summary: 'unknown' },
      },
    },
  },
};

export const MultipleItems = {
  render: (args) => ({
    components: {
      UiAccordion,
      UiText,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiAccordion
      v-model="modelValue"
      :items="items"
      @update:modelValue="onUpdateModelValue"
    >
      <template
        v-for="({ name }, key) in items"
        #[name]="{ item }"
        :key="key"
      >
        <UiText>
          {{ content[item.name] }}
        </UiText>
      </template>
    </UiAccordion>`,
  }),
};

export const SingleItem = {
  render: (args) => ({
    components: {
      UiAccordion,
      UiText,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiAccordion
      v-model="modelValue"
      :items="items"
      @update:modelValue="onUpdateModelValue"
    >
      <template
        v-for="({ name }, key) in items"
        #[name]="{ item }"
        :key="key"
      >
        <UiText>
          {{ content[item.name] }}
        </UiText>
      </template>
    </UiAccordion>`,
  }),

  args: {
    items: [ {
      title: 'Less likely conditions',
      name: 'less',
      settings: {
        iconOpen: 'chevron-up',
        iconClose: 'chevron-down',
      },
      buttonToggleAttrs: { 'data-testid': 'less-likely-conditions-button' },
      iconTogglerAttrs: { 'data-testid': 'less-likely-conditions-icon' },
      contentAttrs: { 'data-testid': 'less-likely-conditions-content' },
      'data-testid': 'less-likely-conditions',
    } ],
    content: { less: 'Serum uric acid concentration' },
  },
};

export const MultipleItemsOpened = {
  render: (args) => ({
    components: {
      UiAccordion,
      UiText,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiAccordion
      v-model="modelValue"
      :items="items"
      @update:modelValue="onUpdateModelValue"
    >
      <template
        v-for="({ name }, key) in items"
        #[name]="{ item }"
        :key="key"
      >
        <UiText>
          {{ content[item.name] }}
        </UiText>
      </template>
    </UiAccordion>`,
  }),

  args: { initModelValue: [] },
  argTypes: { initModelValue: { control: 'array' } },
  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithDefaultSlot = {
  render: (args) => ({
    components: {
      UiAccordion,
      UiAccordionItem,
      UiText,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiAccordion
      v-model="modelValue"
      @onUpdateModelValue="onUpdateModelValue"
    >
      <template
        v-for="(item, key) in items"
        :key="key"
      >
        <UiAccordionItem
          :name="item.name"
          :title="item.title"
          :settings="item.setting"
          :button-toggler-attrs="item.buttonToggleAttrs"
          :icon-toggler-attrs="item.iconTogglerAttrs"
          :content-attrs="item.contentAttrs"
        >
          <UiText>
            {{ content[item.name] }}
          </UiText>
        </UiAccordionItem>
      </template>
    </UiAccordion>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithTogglerSlot = {
  render: (args) => ({
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
        ...events,
        modelValue,
      };
    },
    template: `<UiAccordion
      v-model="modelValue"
      @onUpdateModelValue="onUpdateModelValue"
    >
      <template
        v-for="(item, key) in items"
        :key="key"
      >
        <UiAccordionItem
          :name="item.name"
          :title="item.title"
          :settings="item.setting"
          :button-toggler-attrs="item.buttonToggleAttrs"
          :icon-toggler-attrs="item.iconTogglerAttrs"
          :content-attrs="item.contentAttrs"
        >
          <template #toggler="{
            buttonTogglerAttrs,
            name,
            isOpen,
            toggle,
            title,
            iconOpen,
            iconClose,
            iconTogglerAttrs,
          }">
            <UiButton
              v-bind="buttonTogglerAttrs"
              :id="'toggler-' + name"
              :aria-expanded="isOpen.toString()"
              :aria-controls="name"
              class="ui-button--outlined ui-accordion-item__toggler"
              @click="toggle(name)"
            >
              <UiIcon
                v-bind="iconTogglerAttrs"
                class="ui-button__icon ui-accordion-item__chevron"
              />{{ title }}
            </UiButton>
          </template>
          <UiText>
            {{ content[item.name] }}
          </UiText>
        </UiAccordionItem>
      </template>
    </UiAccordion>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithChevronSlot = {
  render: (args) => ({
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
        ...events,
        modelValue,
      };
    },
    template: `<UiAccordion
      v-model="modelValue"
      @onUpdateModelValue="onUpdateModelValue"
    >
      <template
        v-for="(item, key) in items"
        :key="key"
      >
        <UiAccordionItem
          :name="item.name"
          :title="item.title"
          :settings="item.setting"
          :button-toggler-attrs="item.buttonToggleAttrs"
          :icon-toggler-attrs="item.iconTogglerAttrs"
          :content-attrs="item.contentAttrs"
        >
          <template #chevron="{
            iconTogglerAttrs,
            isOpen,
            iconOpen,
            iconClose,
          }">
            <UiIcon
              v-bind="iconTogglerAttrs"
              class="ui-button__icon ui-accordion-item__chevron"
            />
          </template>
          <UiText>
            {{ content[item.name] }}
          </UiText>
        </UiAccordionItem>
      </template>
    </UiAccordion>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithContentSlot = {
  render: (args) => ({
    components: {
      UiAccordion,
      UiAccordionItem,
      UiText,
    },
    setup() {
      const modelValue = ref(args.initModelValue);
      return {
        ...args,
        ...events,
        modelValue,
      };
    },
    template: `<UiAccordion
      v-model="modelValue"
      @onUpdateModelValue="onUpdateModelValue"
    >
      <template
        v-for="(item, key) in items"
        :key="key"
      >
        <UiAccordionItem
          :name="item.name"
          :title="item.title"
          :settings="item.setting"
          :button-toggler-attrs="item.buttonToggleAttrs"
          :icon-toggler-attrs="item.iconTogglerAttrs"
          :content-attrs="item.contentAttrs"
        >
          <template #content="{
            isOpen,
            contentAttrs,
            name,
            }">
            <div
              v-show="isOpen"
              v-bind="contentAttrs"
              :id="name"
              role="region"
              :aria-labelledby="'toggler-' + name"
              class="ui-accordion-item__content"
            >
              <UiText>
                {{ content[item.name] }}
              </UiText>
            </div>
          </template>
        </UiAccordionItem>
      </template>
    </UiAccordion>`,
  }),

  parameters: { chromatic: { disableSnapshot: true } },
};
