import UiTile from '@/components/molecules/UiTile/UiTile.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import { ref, computed } from 'vue';

export default {
  title: 'Molecules/Tile',
  component: UiTile,
  subcomponents: { UiButton, UiText, UiIcon },
  args: {
    content: 'Yes',
    value: 'present',
    id: 'present',
    iconAttrs: {
      icon: 'yes',
    },
  },
  argTypes: {
    content: { control: 'text' },
    modifiers: {
      control: { type: 'multi-select', options: ['ui-tile--small'] },
      table: {
        category: 'HTML attributes',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiTile },
  setup() {
    const modelValue = computed(() => (args.selected ? args.value : ''));
    return { ...args, modelValue };
  },
  template: `<UiTile
    v-model="modelValue"
    :id="id"
    :value="value"
    :icon-attrs="iconAttrs"
    class="max-w-80 tablet:max-w-68"
    :class="modifiers"
    style="--button-width: 100%"
  >
    {{content}}
  </UiTile>`,
});

export const Large = Template.bind({});
Large.argTypes = {
  value: { control: 'text' },
  selected: { control: 'boolean' },
};

export const Small = Template.bind({});
Small.args = {
  modifiers: ['ui-tile--small'],
};
Small.argTypes = {
  value: { control: 'text' },
  selected: { control: 'boolean' },
};

export const WithIconSlot = (args) => ({
  components: { UiTile, UiIcon },
  setup() {
    const modelValue = computed(() => (args.selected ? args.value : ''));
    return { ...args, modelValue };
  },
  template: `<UiTile
    v-model="modelValue"
    :id="id"
    :value="value"
    :icon-attrs="iconAttrs"
    class="max-w-80 tablet:max-w-68"
    :class="modifiers"
    style="--button-width: 100%"
  >
    <template #icon="{iconAttrs}">
      <UiIcon
        v-bind="iconAttrs"
        class="ui-tile__icon"
      />
    </template>
    {{content}}
  </UiTile>`,
});
WithIconSlot.argTypes = {
  value: { control: 'text' },
  selected: { control: 'boolean' },
};

export const WithLabelSlot = (args) => ({
  components: { UiTile, UiText },
  setup() {
    const modelValue = computed(() => (args.selected ? args.value : ''));
    return { ...args, modelValue };
  },
  template: `<UiTile
    v-model="modelValue"
    :id="id"
    :value="value"
    :icon-attrs="iconAttrs"
    class="max-w-80 tablet:max-w-68"
    :class="modifiers"
    style="--button-width: 100%"
  >
    <template #label>
      <UiText
        tag="span"
        class="ui-tile__label"
      >
        {{ content }}
      </UiText>
    </template>
  </UiTile>`,
});
WithLabelSlot.argTypes = {
  value: { control: 'text' },
  selected: { control: 'boolean' },
};

export const AsGroup = (args) => ({
  components: { UiTile },
  setup() {
    const modelValue = ref('');
    const options = [
      {
        name: 'answer',
        value: { choice_id: 'present' },
        id: 'present',
        iconAttrs: {
          icon: 'yes',
        },
        label: 'Yes',
        class: ['mb-3', 'tablet:mr-6', 'tablet:mb-0'],
      },
      {
        name: 'answer',
        value: { choice_id: 'absent' },
        id: 'absent',
        iconAttrs: {
          icon: 'no',
        },
        label: 'No',
        class: ['mb-3', 'tablet:mr-6', 'tablet:mb-0'],
      },
      {
        name: 'answer',
        value: { choice_id: 'unknown' },
        id: 'unknown',
        iconAttrs: {
          icon: 'dont-know',
        },
        label: 'Don\'t know',
      },
    ];
    return { ...args, modelValue, options };
  },
  template: `<div class="flex flex-col tablet:flex-row max-w-147">
    <template v-for="(option, key) in options" :key="key">
      <UiTile
        v-model="modelValue"
        :id="option.id"
        :value="option.value"
        :icon-attrs="option.iconAttrs"
        style="--button-width: 100%"
        :class="[...option.class || [], ...modifiers || [] ]"
      >
        {{option.label}}
      </UiTile>
    </template>
  </div>`,
});
AsGroup.argTypes = {
  content: { control: false },
  value: { control: false },
  id: { control: false },
  iconAttrs: { control: false },
  modelValue: { control: false },
};
