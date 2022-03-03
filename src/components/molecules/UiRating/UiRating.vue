<template>
  <div class="ui-rating">
    <template
      v-for="index in maxScore"
      :key="index"
    >
      <!-- @slot Use this slot to replace option template. -->
      <slot
        name="option"
        v-bind="{index, rate, radioAttrs, ratingName, hoverHandler, finalScore, settings, translation}"
      >
        <UiRadio
          v-model="rate"
          v-bind="radioAttrs"
          :value="`${index}`"
          :name="ratingName"
          class="ui-rating__option"
          @mouseover="hoverHandler($event, index)"
          @mouseleave="hoverHandler($event, index)"
        >
          <template #radiobutton>
            <div class="ui-radio__radiobutton ui-rating__radiobutton">
              <template v-if="index <= finalScore">
                <!-- @slot Use this slot to replace positive rating icon. -->
                <slot
                  name="icon-active"
                  v-bind="{icon: settings.iconActive}"
                >
                  <UiIcon
                    :icon="settings.iconActive"
                    class="ui-rating__icon ui-rating__icon--active"
                  />
                </slot>
              </template>
              <template v-else>
                <!-- @slot Use this slot to replace rating icon. -->
                <slot
                  name="icon"
                  v-bind="{icon: settings.icon}"
                >
                  <UiIcon
                    :icon="settings.icon"
                    class="ui-rating__icon"
                  />
                </slot>
              </template>
            </div>
          </template>
          <template #label>
            <span class="visual-hidden">{{ translation.stars(index) }}</span>
          </template>
        </UiRadio>
      </slot>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { uid } from 'uid/single';
import UiRadio from '../../atoms/UiRadio/UiRadio.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';

const props = defineProps({
  /**
    * Use this props to set current rate.
    */
  modelValue: {
    type: [String, Number],
    default: '0',
  },
  /**
     * Use this props to set max rate
     */
  max: {
    type: String,
    default: '1',
  },
  /**
     * Use this props to set radio name.
     */
  name: {
    type: String,
    default: '',
  },
  /**
     * Use this props to pass attrs for UiRadio
     */
  radioAttrs: {
    type: Object,
    default: () => ({}),
  },
  /**
     * Use this props to setup item component.
     */
  settings: {
    type: Object,
    default: () => ({
      icon: 'star-outlined',
      iconActive: 'star-filled',
    }),
  },
  /**
     * Use this props to override labels inside component translation.
     */
  translation: {
    type: Object,
    default: () => ({
      stars: (index) => (`${index} stars`),
    }),
  },
});
const emit = defineEmits(['update:modelValue']);
const ratingName = computed(() => (
  props.name || `radio-${uid()}`
));
const rate = computed({
  get: () => (`${props.modelValue}`),
  set: (value) => { emit('update:modelValue', value); },
});
const maxScore = computed(() => (parseInt(props.max, 10)));
const hoverScore = ref(0);
function hoverHandler({ type }, value) {
  hoverScore.value = type === 'mouseover' ? value : 0;
}
const finalScore = computed(() => (
  parseInt(hoverScore.value, 10)
    ? parseInt(hoverScore.value, 10)
    : parseInt(rate.value, 10)));
</script>

<style lang="scss">
@import "../../../styles/mixins/mixins";

.ui-rating {
  $this: &;

  --radio-margin: 0;
  --radio-border-radius: 0;
  --radio-border-width: 0;
  --radio-size: var(--rating-icon-size, 1.5rem);
  --radio-background: transparent;

  display: inline-flex;

  &__option {
    @include no-highlight;

    padding: var(--rating-option, 0 var(--space-24) 0 0);

    [dir="rtl"] & {
      padding: var(--rating-option, 0 0 0 var(--space-24));
    }

    &:last-of-type {
      [dir] & {
        padding: var(--rating-option, 0);
      }
    }
  }

  &__radiobutton {
    pointer-events: none;
  }

  &__icon {
    --icon-size: var(--rating-icon-size, 1.5rem);
    --icon-color: var(--rating-icon-icon-color, var(--color-icon-secondary));

    &:active {
      --icon-color: var(--rating-icon-active-icon-color, var(--color-icon-secondary-active));
    }

    &--active {
      --icon-color: var(--rating-icon-positive-icon-color, var(--color-icon-primary));

      &:active {
        --icon-color: var(--rating-icon-positive-active-icon-color, var(--color-icon-primary-active));
      }
    }

    @media (hover: hover) {
      &:hover {
        --icon-color: var(--rating-icon-hover-icon-color, var(--color-icon-secondary-hover));
      }

      &--active:hover {
        --icon-color: var(--rating-icon-positive-hover-icon-color, var(--color-icon-primary-hover));
      }
    }
  }

  &--is-disabled {
    #{$this}__icon {
      --rating-icon-icon-color: var(--rating-icon-disabled-icon-color, var(--color-icon-disabled));
      --rating-icon-hover-icon-color: var(--rating-icon-disabled-hover-icon-color, var(--color-icon-disabled));
      --rating-icon-active-icon-color: var(--rating-icon-disabled-active-icon-color, var(--color-icon-disabled));
      --rating-icon-positive-icon-color: var(--rating-icon-disabled-positive-icon-color, var(--color-icon-disabled));
      --rating-icon-positive-hover-icon-color:
        var(
          --rating-icon-disabled-positive-hover-icon-color,
          var(--color-icon-disabled)
        );
      --rating-icon-positive-active-icon-color:
        var(
          --rating-icon-disabled-positive-active-icon-color,
          var(--color-icon-disabled)
        );
    }
  }

  input:focus + * {
    --radio-border-radius: var(--border-radius-outline);
  }
}
</style>
