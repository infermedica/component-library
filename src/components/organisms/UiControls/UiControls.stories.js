import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { actions } from '@storybook/addon-actions';
import { WithDescriptionSlot } from '@/components/organisms/UiCard/UiCard.stories';

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
    hideBackButton: false,
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
  parameters: {
    cssProperties: {
      '--controls-container-padding-block': 'var(--controls-container-padding-block-start, var(--space-32)) var(--controls-container-padding-block-end, var(--space-32))',
      '--controls-container-padding-inline': 'var(--controls-container-padding-inline-start, var(--space-20)) var(--controls-container-padding-inline-end, var(--space-20))',
      '--controls-tablet-container-padding-block': 'var(--controls-tablet-container-padding-block-start, var(--space-48)) var(--controls-tablet-container-padding-block-end, var(--space-48))',
      '--controls-tablet-container-padding-inline': 'var(--controls-tablet-container-padding-inline-start, var(--space-64)) var(--controls-tablet-container-padding-inline-end, var(--space-64))',
      '--controls-bottom-padding-block': 'var(--controls-bottom-padding-block-start, var(--space-12)) var(--controls-bottom-padding-block-end, var(--space-12))',
      '--controls-bottom-padding-inline': 'var(--controls-bottom-padding-inline-start, var(--space-20)) var(--controls-bottom-padding-inline-end, var(--space-20))',
      '--controls-bottom-border-start-start-radius': '0',
      '--controls-bottom-border-start-end-radius': '0',
      '--controls-bottom-border-end-start-radius': '0',
      '--controls-bottom-border-end-end-radius': '0',
      '--controls-bottom-transition': 'border-color 150ms ease-in-out',
      '--controls-bottom-height': '5rem',
      '--controls-bottom-border-block': 'var(--controls-bottom-border-block-start, var(--controls-bottom-border)) var(--controls-bottom-border-block-end, var(--controls-bottom-border))',
      '--controls-bottom-border-inline': 'var(--controls-bottom-border-inline-start, var(--controls-bottom-border)) var(--controls-bottom-border-inline-end, var(--controls-bottom-border))',
      '--controls-bottom-border-block-style': 'var(--controls-bottom-border-block-start-style, solid) var(--controls-bottom-border-block-end-style, solid)',
      '--controls-bottom-border-inline-style': 'var(--controls-bottom-border-inline-start-style, solid) var(--controls-bottom-border-inline-end-style, solid)',
      '--controls-bottom-border-block-color': 'var(--controls-bottom-border-block-start-color, var(--color-border-divider)) var(--controls-bottom-border-block-end-color, var(--color-border-divider))',
      '--controls-bottom-border-inline-color': 'var(--controls-bottom-border-inline-start-color, var(--color-border-divider)) var(--controls-bottom-border-inline-end-color, var(--color-border-divider))',
      '--controls-bottom-border-block-width': 'var(--controls-bottom-border-block-start-width, 1px) var(--controls-bottom-border-block-end-width, 0)',
      '--controls-bottom-border-inline-width': 'var(--controls-bottom-border-inline-start-width, 0) var(--controls-bottom-border-inline-end-width, 0)',
      '--controls-tablet-bottom-padding-block': 'var(--controls-tablet-bottom-padding-block-start, var(--space-16)) var(--controls-tablet-bottom-padding-block-end, var(--space-16))',
      '--controls-tablet-bottom-padding-inline': 'var(--controls-tablet-bottom-padding-inline-start, var(--space-32)) var(--controls-tablet-bottom-padding-inline-end, var(--space-32))',
    },
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
          :class="[
            'ui-controls__next', 
            { 'ui-button--is-disabled': invalid },
          ]"
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
          />{{ translation.back }}
        </UiButton>
      </div>
    </template>
  </UiControls>`,
});
WithBottomSlot.parameters = { chromatic: { disableSnapshot: true } };

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
        :class="[ 
          'ui-controls__next',
          { 'ui-button--is-disabled': invalid },
        ]"
      >
        {{ translation.next }}
      </UiButton>
      <span v-else/>
    </template>
  </UiControls>`,
});
WithNextSlot.parameters = { chromatic: { disableSnapshot: true } };

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
        />{{ translation.back }}
      </UiButton>
    </template>
  </UiControls>`,
});
WithBackSlot.parameters = { chromatic: { disableSnapshot: true } };
