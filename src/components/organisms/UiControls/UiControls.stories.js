import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { actions } from '@storybook/addon-actions';

const events = actions({ onHasError: 'has-error' });

export default {
  title: 'Organisms/Controls',
  component: UiControls,
  subcomponents: {
    UiText,
    UiButton,
    UiIcon,
  },
  args: {
    hideNextButton: false,
    toBack: { path: '/back' },
    toNext: { path: '/next' },
    invalid: true,
    translation: {
      back: 'Back',
      next: 'Next',
    },
    containerAttrs: { 'data-testid': 'container-element' },
    buttonNextAttrs: { 'data-testid': 'next-button' },
    buttonBackAttrs: { 'data-testid': 'back-button' },
    iconBackAttrs: { 'data-testid': 'back-icon' },
  },
  argTypes: {
    toBack: { control: 'object' },
    toNext: { control: 'object' },
    'has-error': {
      description: 'Use this event to detect when control has error and toNext is blocked.',
      table: { category: 'events' },
    },
    containerAttrs: { table: { subcategory: 'Attrs props' } },
    buttonNextAttrs: { table: { subcategory: 'Attrs props' } },
    buttonBackAttrs: { table: { subcategory: 'Attrs props' } },
    iconBackAttrs: { table: { subcategory: 'Attrs props' } },
  },
};

const Template = (args) => ({
  components: { UiControls },
  setup() {
    return {
      ...args,
      ...events,
    };
  },
  template: `<UiControls
    :hide-next-button="hideNextButton"
    :to-back="toBack"
    :to-next="toNext"
    :invalid="invalid"
    :translation="translation"
    :container-attrs="containerAttrs"
    :button-next-attrs="buttonNextAttrs"
    :button-back-attrs="buttonBackAttrs"
    :icon-back-attrs="iconBackAttrs"
    @has-error="onHasError"
  />`,
});

export const Common = Template.bind({});

export const WithBottomSlot = (args) => ({
  components: {
    UiControls,
    UiText,
    UiButton,
    UiIcon,
  },
  setup() {
    return {
      ...args,
      ...events,
    };
  },
  template: `<UiControls
    :hide-next-button="hideNextButton"
    :to-back="toBack"
    :to-next="toNext"
    :invalid="invalid"
    :translation="translation"
    :button-next-attrs="buttonNextAttrs"
    :button-back-attrs="buttonBackAttrs"
    :icon-back-attrs="iconBackAttrs"
    @has-error="onHasError"
  >
    <template #bottom="{
      toNext,
      hideNextButton,
      buttonNextAttrs,
      invalid,
      toBack,
      iconBackAttrs,
      buttonBackAttrs,
      translation,
    }">
      <div class="ui-controls__bottom">
        <UiButton
          v-if="toNext && !hideNextButton"
          v-bind="buttonNextAttrs"
          class="ui-controls__next"
          :class="{
            'ui-button--is-disabled': invalid
          }"
        >
          {{ translation.next }}
        </UiButton>
        <span v-else />
        <UiButton
          v-if="toBack"
          v-bind="buttonBackAttrs"
          class="ui-button--text ui-controls__back"
        >
          <UiIcon
            v-bind="iconBackAttrs"
            class="ui-button__icon"
          /> {{ translation.back }}
        </UiButton>
      </div>
    </template>
  </UiControls>`,
});

export const WithNextSlot = (args) => ({
  components: {
    UiControls,
    UiButton,
  },
  setup() {
    return {
      ...args,
      ...events,
    };
  },
  template: `<UiControls
    :hide-next-button="hideNextButton"
    :to-back="toBack"
    :to-next="toNext"
    :invalid="invalid"
    :translation="translation"
    :button-next-attrs="buttonNextAttrs"
    :button-back-attrs="buttonBackAttrs"
    :icon-back-attrs="iconBackAttrs"
    @has-error="onHasError"
  >
    <template #next="{
      toNext,
      hideNextButton, 
      buttonNextAttrs, 
      invalid, 
      translation
    }">
      <UiButton
        v-if="toNext && !hideNextButton"
        v-bind="buttonNextAttrs"
        class="ui-controls__next"
        :class="{
          'ui-button--is-disabled': invalid
        }"
      >
        {{ translation.next }}
      </UiButton>
      <span v-else/>
    </template>
  </UiControls>`,
});

export const WithBackSlot = (args) => ({
  components: {
    UiControls,
    UiButton,
    UiIcon,
  },
  setup() {
    return {
      ...args,
      ...events,
    };
  },
  template: `<UiControls
    :hide-next-button="hideNextButton"
    :to-back="toBack"
    :to-next="toNext"
    :invalid="invalid"
    :translation="translation"
    :button-next-attrs="buttonNextAttrs"
    :button-back-attrs="buttonBackAttrs"
    :icon-back-attrs="iconBackAttrs"
    @has-error="onHasError"
  >
    <template #next="{
      toBack, 
      buttonBackAttrs,
      iconBackAttrs, 
      translation
    }">
      <UiButton
        v-if="toBack"
        v-bind="buttonBackAttrs"
        class="ui-button--text ui-controls__back"
      >
        <UiIcon
          v-bind="iconBackAttrs"
          class="ui-button__icon"
        /> {{ translation.back }}
      </UiButton>
    </template>
  </UiControls>`,
});
