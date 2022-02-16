import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';

export default {
  title: 'Organisms/Controls',
  component: UiControls,
  subcomponents: { UiText, UiButton, UiIcon },
  args: {
    toBack: '#toBack',
    toNext: '#toNext',
    translation: {
      back: 'Back',
      next: 'Next',
    },
  },
  argTypes: {
    invalid: {
      control: { type: 'boolean' },
    },
    hideNextButton: {
      control: { type: 'boolean' },
    },
    toBack: { control: { type: 'text' } },
    toNext: { control: { type: 'text' } },
  },
  parameters: {
    cssprops: {
      'controls-container-padding': {
        value: 'var(--space-32) var(--space-20)',
        control: 'text',
        description: '',
      },
      'controls-container-tablet-padding': {
        value: 'var(--space-48) var(--space-48) var(--space-40)',
        control: 'text',
        description: '',
      },
      'controls-bottom-align-items': {
        value: 'center',
        control: 'text',
        description: '',
      },
      'controls-bottom-justify-content': {
        value: 'space-between',
        control: 'text',
        description: '',
      },
      'controls-bottom': {
        value: '5rem',
        control: 'text',
        description: '',
      },
      'controls-bottom-padding': {
        value: 'var(--space-12) var(--space-20)',
        control: 'text',
        description: '',
      },
      'controls-bottom-border': {
        value: 'solid var(--color-border-divider)',
        control: 'text',
        description: '',
      },
      'controls-bottom-border-width': {
        value: '1px 0 0 0',
        control: 'text',
        description: '',
      },
      'controls-tablet-bottom-padding': {
        value: 'var(--space-16) var(--space-32)',
        control: 'text',
        description: '',
      },
      'controls-next-margin': {
        value: '0 auto 0 0',
        control: 'text',
        description: '',
      },
      'controls-back-margin': {
        value: '0 0 0 auto',
        control: 'text',
        description: '',
      },
    },
  },
};

const Template = (args) => ({
  components: { UiControls },
  setup() {
    return { ...args };
  },
  template: `<UiControls
    :hide-next-button="hideNextButton"
    :to-back="toBack"
    :to-next="toNext"
    :invalid="invalid"
    :translation="translation"
  />`,
});

export const Common = Template.bind({});

export const WithContainerSlot = (args) => ({
  components: { UiControls },
  setup() {
    return { ...args };
  },
  template: `<UiControls
    :hide-next-button="hideNextButton"
    :to-back="toBack"
    :to-next="toNext"
    :invalid="invalid"
    :translation="translation"
    @has-error="hasError"
  >
    <template #container>
      <div class="ui-controls__container"/>
    </template>
  </UiControls>`,
});

export const WithBottomSlot = (args) => ({
  components: {
    UiControls, UiText, UiButton, UiIcon,
  },
  setup() {
    return { ...args };
  },
  template: `<UiControls
    :hide-next-button="hideNextButton"
    :to-back="toBack"
    :to-next="toNext"
    :invalid="invalid"
    :translation="translation"
    @has-error="hasError"
  >
    <template #bottom="{toBack, toNext, hideNextButton, invalid, translation}">
      <div class="ui-controls__bottom">
        <UiButton
          v-if="!hideNextButton"
          v-bind="validNext"
          class="ui-controls__next"
          :class="{'ui-button--is-disabled': invalid}"
        >
          {{ translation.next }}
        </UiButton>
        <UiButton
          v-if="toBack"
          :to="toBack"
          class="ui-controls__back ui-button--text ui-button--has-icon"
        >
          <UiIcon
            icon="chevron-left"
            class="ui-button__icon"
          /> {{ translation.back }}
        </UiButton>
      </div>
    </template>
  </UiControls>`,
});

export const WithNextSlot = (args) => ({
  components: { UiControls, UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiControls
    :hide-next-button="hideNextButton"
    :to-back="toBack"
    :to-next="toNext"
    :invalid="invalid"
    :translation="translation"
    @has-error="hasError"
  >
    <template #next="{hideNextButton, validNext, invalid, translation}">
      <UiButton
        v-if="!hideNextButton"
        v-bind="validNext"
        class="ui-controls__next"
        :class="{'ui-button--is-disabled': invalid}"
      >
        {{ translation.next }}
      </UiButton>
    </template>
  </UiControls>`,
});

export const WithBackSlot = (args) => ({
  components: { UiControls, UiButton },
  setup() {
    return { ...args };
  },
  template: `<UiControls
    :hide-next-button="hideNextButton"
    :to-back="toBack"
    :to-next="toNext"
    :invalid="invalid"
    :translation="translation"
    @has-error="hasError"
  >
    <template #next="{toBack, translation}">
      <UiButton
        v-if="toBack"
        :to="toBack"
        class="ui-controls__back ui-button--text ui-button--has-icon"
      >
        <UiIcon
          icon="chevron-left"
          class="ui-button__icon"
        /> {{ translation.back }}
      </UiButton>
    </template>
  </UiControls>`,
});
