import UiCheckbox from '@/components/atoms/UiCheckbox/UiCheckbox.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiList from '@/components/organisms/UiList/UiList.vue';
import UiListItem from '@/components/organisms/UiList/_internal/UiListItem.vue';

import { ref } from 'vue';

export default {
  title: 'Atoms/Checkbox',
  component: UiCheckbox,
  subcomponents: { UiIcon },
  args: {
    content: 'I read and accept Terms of Service and Privacy Policy.',
    id: 'agreement',
    value: '',
    modelValue: true,
  },
  argTypes: {
    content: { control: 'text' },
    id: { control: 'text' },
    modelValue: { control: false },
    disabled: {
      control: 'boolean',
      table: {
        category: 'HTML attributes',
      },
    },
    modifiers: {
      control: { type: 'multi-select', options: ['ui-checkbox--has-error', 'ui-checkbox--is-disabled'] },
      table: {
        category: 'HTML attributes',
      },
    },
  },
  parameters: {
    cssprops: {
      'checkbox-size': {
        value: '1.25rem',
        control: 'text',
        description: '',
      },
      'checkbox-margin': {
        value: '0.125rem',
        control: 'text',
        description: '',
      },
      'checkbox-background': {
        value: 'var(--color-background-white)',
        control: 'text',
        description: '',
      },
      'checkbox-border': {
        value: 'solid var(--color-border-strong)',
        control: 'text',
        description: '',
      },
      'checkbox-border-width': {
        value: '2px',
        control: 'text',
        description: '',
      },
      'checkbox-border-radius': {
        value: 'var(--border-radius-form)',
        control: 'text',
        description: '',
      },
      'checkbox-label-flex': {
        value: '1',
        control: 'text',
        description: '',
      },
      'checkbox-label-margin': {
        value: '0 var(--space-12) 0 0',
        control: 'text',
        description: '',
      },
      'checkbox-label-color': {
        value: 'var(--color-text-body)',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiCheckbox },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiCheckbox
    v-model="modelValue"
    :id="id"
    :disabled="disabled"
    :class="modifiers"
  >
    {{content}}
  </UiCheckbox>`,
});

export const WithLabel = Template.bind({});

export const IsDisabled = Template.bind({});
IsDisabled.args = {
  modifiers: ['ui-checkbox--is-disabled'],
};

export const HasError = Template.bind({});
HasError.args = {
  modifiers: ['ui-checkbox--has-error'],
};

export const WithCheckbuttonSlot = (args) => ({
  components: { UiCheckbox, UiIcon },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiCheckbox
      v-model="modelValue"
      :id="id"
      :disabled="disabled"
      :class="modifiers"
    >
      <template #checkbutton="{checked}">
        <div class="ui-checkbox__checkbutton">
          <UiIcon
            icon="checkmark"
            class="ui-checkbox__mark"
          />
        </div>
      </template>
      {{ content }}
    </UiCheckbox>`,
});

export const WithLabelSlot = (args) => ({
  components: { UiCheckbox },
  setup() {
    const modelValue = ref(true);
    return { ...args, modelValue };
  },
  template: `<UiCheckbox
      v-model="modelValue"
      :id="id"
      :disabled="disabled"
      :class="modifiers"
    >
      <template #label>
        <div class="ui-checkbox__label">
          {{ content }}
        </div>
      </template>
    </UiCheckbox>`,
});

export const ValueAsObject = (args) => ({
  components: { UiCheckbox },
  setup() {
    const modelValue = ref([]);
    return { ...args, modelValue };
  },
  template: `<UiCheckbox
    v-model="modelValue"
    :id="id"
    :value="value"
    :disabled="disabled"
    :class="modifiers"
  >
    {{content}}
  </UiCheckbox>`,
});
ValueAsObject.args = {
  value: {
    id: 1,
    question: 34,
  },
};
ValueAsObject.argTypes = {
  modelValue: { control: false },
};

export const AsGroup = (args) => ({
  components: { UiCheckbox, UiList, UiListItem },
  setup() {
    const modelValue = ref([{
      label: 'Europe',
      id: 'p_15',
      choice_id: 'present',
      source: 'predefined',
    }]);
    return { ...args, modelValue };
  },
  template: `<UiList style="--list-item-padding: var(--space-12) 0;">
    <UiListItem 
      v-for="(value, key) in values"
      :key="key"
    >
      <UiCheckbox
        v-model="modelValue"
        :value="value"
      >
        {{value.label}}
      </UiCheckbox>
    </UiListItem>
  </UiList>`,
});
AsGroup.args = {
  values: [
    {
      label: 'Russia, Kazakhstan or Mongolia',
      id: 'p_20',
      choice_id: 'present',
      source: 'predefined',
    },
    {
      label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      id: 'p_236',
      choice_id: 'present',
      source: 'predefined',
    },
    {
      label: 'Europe',
      id: 'p_15',
      choice_id: 'present',
      source: 'predefined',
    },
  ],
};
AsGroup.argTypes = {
  values: {
    control: 'object',
  },
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  disabled: { control: false },
  content: { control: false },
};

export const AsGroupWithNestedObject = (args) => ({
  components: { UiCheckbox, UiList, UiListItem },
  setup() {
    const modelValue = ref([{
      label: 'Europe',
      id: 'p_15',
      choice_id: 'present',
      source: 'predefined',
      checkboxAttrs: {
        ariaLabel: 'Europe',
      },
    }]);
    return { ...args, modelValue };
  },
  template: `<UiList style="--list-item-padding: var(--space-12) 0;">
    <UiListItem 
      v-for="(value, key) in values"
      :key="key"
    >
      <UiCheckbox
        v-model="modelValue"
        v-bind="value.checkboxAttrs"
        :value="value"
      >
        {{value.label}}
      </UiCheckbox>
    </UiListItem>
  </UiList>`,
});
AsGroupWithNestedObject.args = {
  values: [
    {
      label: 'Russia, Kazakhstan or Mongolia',
      id: 'p_20',
      choice_id: 'present',
      source: 'predefined',
      checkboxAttrs: {
        ariaLabel: 'Russia, Kazakhstan or Mongolia',
      },
    },
    {
      label: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      id: 'p_236',
      choice_id: 'present',
      source: 'predefined',
      checkboxAttrs: {
        ariaLabel: 'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
      },
    },
    {
      label: 'Europe',
      id: 'p_15',
      choice_id: 'present',
      source: 'predefined',
      checkboxAttrs: {
        ariaLabel: 'Europe',
      },
    },
  ],
};
AsGroupWithNestedObject.argTypes = {
  values: {
    control: 'object',
  },
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  disabled: { control: false },
  content: { control: false },
};

export const AsGroupWithPrimitiveTypes = (args) => ({
  components: { UiCheckbox, UiList, UiListItem },
  setup() {
    const modelValue = ref(['Europe']);
    return { ...args, modelValue };
  },
  template: `<UiList style="--list-item-padding: var(--space-12) 0;">
    <UiListItem 
      v-for="(value, key) in values"
      :key="key"
    >
      <UiCheckbox
        v-model="modelValue"
        :value="value"
      >
        {{value}}
      </UiCheckbox>
    </UiListItem>
  </UiList>`,
});
AsGroupWithPrimitiveTypes.args = {
  values: [
    'Russia, Kazakhstan or Mongolia',
    'Asia excluding Middle East, Russia, Mongolia and Kazakhstan',
    'Europe',
  ],
};
AsGroupWithPrimitiveTypes.argTypes = {
  values: {
    control: 'object',
  },
  id: { control: false },
  value: { control: false },
  modifiers: { control: false },
  disabled: { control: false },
  content: { control: false },
};
