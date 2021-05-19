<template>
  <div class="ui-stepper">
    <!-- @slot Use this slot to replace the mobile stepper -->
    <slot
      name="mobile"
      v-bind="{currentStep, currentStepDisplayText, stepsProgress}"
    >
      <div class="ui-stepper__mobile">
        <!-- @slot Use this slot to replace text in the mobile stepper -->
        <slot
          name="current-step"
          v-bind="{currentStepDisplayText}"
        >
          <UiText
            tag="span"
            class="ui-stepper__text"
          >
            {{ currentStepDisplayText }}
          </UiText>
        </slot>
        <!-- @slot Use this slot to replace progress in the stepper -->
        <slot
          name="progress"
          v-bind="{stepsProgress}"
        >
          <UiProgress
            v-bind="progressAttrs"
            min="0"
            max="100"
            :value="stepsProgress"
          />
        </slot>
      </div>
    </slot>
    <!-- @slot Use this slot to replace desktop version of the stepper -->
    <slot
      name="desktop"
      v-bind="{steps, currentStep, indexOfActiveStep, determineStep}"
    >
      <UiList class="ui-stepper__desktop">
        <!-- @slot Use this slot to replace items in the desktop list -->
        <slot
          name="items"
          v-bind="{steps, indexOfActiveStep, determineStep}"
        >
          <template
            v-for="(step, index) in steps"
            :key="index"
          >
            <!-- @slot Use this slot to replace item in the desktop list -->
            <slot
              name="item"
              v-bind="{step, index, indexOfActiveStep, determineStep}"
            >
              <UiListItem
                class="ui-stepper__item"
                :class="{
                  'ui-stepper__item--visited': indexOfActiveStep >= index,
                  'ui-stepper__item--active': indexOfActiveStep === index,
                }"
              >
                <!-- @slot Use this slot to replace items-link in the desktop list -->
                <slot
                  name="item-link"
                  v-bind="{step, index, indexOfActiveStep, determineStep}"
                >
                  <UiLink
                    v-bind="determineStep(index, step.route)"
                    class="ui-link--secondary ui-stepper__item-link"
                  >
                    {{ step.name }}
                  </UiLink>
                </slot>
              </Uilistitem>
            </slot>
          </template>
        </slot>
      </Uilist>
    </slot>
  </div>
</template>

<script>
import { computed } from 'vue';
import UiLink from '../../atoms/UiLink/UiLink.vue';
import UiText from '../../atoms/UiText/UiText.vue';
import UiProgress from '../../atoms/UiProgress/UiProgress.vue';
import UiList from '../../organisms/UiList/UiList.vue';
import UiListItem from '../../organisms/UiList/_internal/UiListItem.vue';

export default {
  name: 'UiStepper',
  components: {
    UiText,
    UiLink,
    UiProgress,
    UiList,
    UiListItem,
  },
  props: {
    steps: {
      type: Array,
      default: () => [
        {
          name: '',
          route: '',
        },
      ],
    },
    currentStep: {
      type: String,
      default: '',
    },
    progressAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const stepsLength = computed(() => props.steps.length);
    const indexOfActiveStep = computed(() => props.steps.findIndex((step) => step.name === props.currentStep));
    const currentStepDisplayNumber = computed(() => indexOfActiveStep.value + 1);
    const currentStepDisplayText = computed(() => `
      ${currentStepDisplayNumber.value}/${props.steps.length} ${props.currentStep}
    `);
    const stepsProgress = computed(() => (currentStepDisplayNumber.value / stepsLength.value) * 100);
    const determineStep = (itemIndex, route) => ({
      to: itemIndex < indexOfActiveStep.value ? route : null,
      class: itemIndex <= indexOfActiveStep.value ? null : 'ui-link--is-disabled',
    });

    return {
      stepsLength,
      stepsProgress,
      indexOfActiveStep,
      currentStepDisplayText,
      determineStep,
    };
  },
};
</script>

<style lang="scss">
@import '../../../styles/mixins/_mixins.scss';

.ui-stepper {
  // Variables for inner progress-bar customization
  $this: &;

  --progress-background: var(--stepper-progress-background, var(--color-bar-track));
  --progress-value-background: var(--stepper-progress-background, var(--color-bar-indicator));
  --progress-border-radius: var(--stepper-progress-border-radius, 2px);

  padding: var(--stepper-padding, var(--space-12) var(--space-20));
  background: var(--stepper-background, var(--color-background-subtle));

  @media (min-width: 992px) {
    --stepper-padding: 0;
    --stepper-background: transparent;

    justify-content: flex-start;
  }

  &__mobile {
    --progress-width: 6rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 768px) {
      --progress-width: 11.25rem;
    }

    @media (min-width: 992px) {
      display: none;
    }
  }

  &__desktop {
    display: none;

    @media (min-width: 992px) {
      display: flex;
      flex-direction: column;
    }
  }

  &__text {
    @include font(--font-body-2-compact);

    @media (min-width: 768px) {
      @include font(--font-body-1);
    }
  }

  &__item {
    @media (min-width: 992px) {
      @include font(--font-body-1);

      position: relative;

      --list-item-padding:
        calc(var(--space-20) * 0.5)
        var(--space-12)
        calc(var(--space-20) * 0.5)
        var(--space-16);

      [dir=rtl] & {
        --list-item-padding:
          calc(var(--space-20) * 0.5)
          var(--space-16)
          calc(var(--space-20) * 0.5)
          var(--space-12);
      }

      @mixin progress-vertical($background, $z-index) {
        position: absolute;
        top: -2px;
        left: 0;
        z-index: $z-index;
        display: block;
        width: 0.25rem;
        height: 100%;
        content: "";
        background-color: $background;
        border-radius: var(--stepper-progress-radius);

        [dir=rtl] & {
          right: 0;
          left: auto;
        }
      }

      &::after {
        @include progress-vertical(var(--color-bar-track), 0);
      }

      &--visited {
        &::after {
          @include progress-vertical(var(--color-bar-indicator), 1);
        }
      }

      &--active {
        #{$this}__item-link {
          @include font(--font-body-1-thick);

          --link-color: var(--stepper-link-active-color, var(--color-text-body));
          --link-hover-color: var(--stepper-link-active-color, var(--color-text-body));
          --link-active-color: var(--stepper-link-active-color, var(--color-text-body));
        }
      }
    }
  }

  &__item-link {
    @media (min-width: 992px) {
      @include font(--font-body-1);

      width: 100%;
    }
  }
}
</style>

