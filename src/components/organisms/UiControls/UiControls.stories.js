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
            icon="chevronLeft"
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
          icon="chevronLeft"
          class="ui-button__icon"
        /> {{ translation.back }}
      </UiButton>
    </template>
  </UiControls>`,
});
