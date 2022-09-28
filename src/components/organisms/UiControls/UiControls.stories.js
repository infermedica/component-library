import UiControls from '@/components/organisms/UiControls/UiControls.vue';
import UiButton from '@/components/atoms/UiButton/UiButton.vue';
import UiIcon from '@/components/atoms/UiIcon/UiIcon.vue';
import UiText from '@/components/atoms/UiText/UiText.vue';
import { actions } from '@storybook/addon-actions';

const events = actions({
  onHasError: 'has-error',
});

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
    toBack: {
      path: '/back',
    },
    toNext: {
      path: '/next',
    },
    invalid: true,
    translation: {
      back: 'Back',
      next: 'Next',
    },
    buttonBackAttrs: {
      id: 'controls-back',
    },
    buttonNextAttrs: {
      id: 'controls-next',
    },
  },
  argTypes: {
    toBack: {
      control: 'object',
    },
    toNext: {
      control: 'object',
    },
    'has-error': {
      description: 'Use this event to detect when control has error and toNext is blocked.',
      table: {
        category: 'events',
      },
    },
    buttonBackAttrs: {
      description: 'Use this props to pass attrs for back UiButton',
      table: {
        category: 'props',
        type: {
          summary: 'object',
        },
      },
      control: 'object',
    },
    buttonNextAttrs: {
      description: 'Use this props to pass attrs for next UiButton',
      table: {
        category: 'props',
        type: {
          summary: 'object',
        },
      },
      control: 'object',
    },
  },
};

const Template = (args) => ({
  components: {
    UiControls,
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
    :button-back-attrs="buttonBackAttrs"
    :button-next-attrs="buttonNextAttrs"
    @has-error="onHasError"
  />`,
});

export const Common = Template.bind({
});

export const WithContainerSlot = (args) => ({
  components: {
    UiControls,
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
    :button-back-attrs="buttonBackAttrs"
    :button-next-attrs="buttonNextAttrs"
    @has-error="onHasError"
  >
    <template #container>
      <div class="ui-controls__container"/>
    </template>
  </UiControls>`,
});

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
    :button-back-attrs="buttonBackAttrs"
    :button-next-attrs="buttonNextAttrs"
    @has-error="onHasError"
  >
    <template #bottom="{toBack, backButtonAttrs, toNext, nextButtonAttrs, hideNextButton, invalid, translation}">
      <div class="ui-controls__bottom">
        <UiButton
          v-if="!hideNextButton"
          v-bind="nextButtonAttrs"
          class="ui-controls__next"
          :class="{'ui-button--is-disabled': invalid}"
        >
          {{ translation.next }}
        </UiButton>
        <UiButton
          v-if="toBack"
          v-bind="backButtonAttrs"
          class="ui-button--text ui-controls__back"
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
    :button-back-attrs="buttonBackAttrs"
    :button-next-attrs="buttonNextAttrs"
    @has-error="onHasError"
  >
    <template #next="{hideNextButton, attrs, invalid, translation}">
      <UiButton
        v-if="!hideNextButton"
        v-bind="attrs"
        class="ui-controls__next"
        :class="{'ui-button--is-disabled': invalid}"
      >
        {{ translation.next }}
      </UiButton>
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
    :button-back-attrs="buttonBackAttrs"
    :button-next-attrs="buttonNextAttrs"
    @has-error="onHasError"
  >
    <template #next="{toBack, attrs, translation}">
      <UiButton
        v-if="toBack"
        v-bind="attrs"
        class="ui-button--text ui-controls__back"
      >
        <UiIcon
          icon="chevron-left"
          class="ui-button__icon"
        /> {{ translation.back }}
      </UiButton>
    </template>
  </UiControls>`,
});
