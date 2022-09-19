<template>
  <div
    class="ui-tabs-item"
    :class="{
      'ui-tabs-item--is-active': isActive
    }"
  >
    <!-- @slot Use this slot to replace tab template. -->
    <slot
      name="tab"
      v-bind="{
        id,
        isActive,
        buttonAttrs,
        contentAttrs,
        handleTabActive,
        title
      }"
    >
      <div
        ref="tab"
        class="ui-tabs-item__tab"
      >
        <!-- @slot Use this slot to replace tab-button template. -->
        <slot
          name="tab-button"
          v-bind="{
            id,
            isActive,
            attrs:buttonAttrs,
            handleTabActive,
            title
          }"
        >
          <UiButton
            :id="`button-${id}`"
            :aria-expanded="`${isActive}`"
            :aria-controls="id"
            class="ui-button--text ui-tabs-item__tab-button"
            v-bind="buttonAttrs"
            @click="handleTabActive($event, id)"
          >
            {{ title }}
          </UiButton>
        </slot>
      </div>
    </slot>
    <!-- @slot Use this slot to replace content template. -->
    <slot
      name="content"
      v-bind="{
        isActive,
        attrs: contentAttrs,
        id,
      }"
    >
      <div
        v-show="isActive"
        v-bind="contentAttrs"
        :id="id"
        role="region"
        :aria-labelledby="`button-${id}`"
        class="ui-tabs-item__content"
      >
        <slot />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  inject,
  useAttrs,
} from 'vue';
import type { Ref } from 'vue';
import { uid } from 'uid/single';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type { PropsAttrs } from '../../../../types/attrs';

const props = defineProps({
  /**
   * Use this props to set item title.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Use this props to set item name, it used to toggle.
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * Use this props to pass attrs for toggle UiButton.
   */
  buttonAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for content element.
   */
  contentAttrs: {
    type: Object,
    default: () => ({}),
  },
});
const attrs = useAttrs() as {id: string};
const activeTab = inject('activeTab') as Ref<string>;
const hasActiveTab = computed(() => (!!activeTab.value));

const id = computed(() => (props.name || attrs.id || `tab-${uid()}`));
const isActive = computed(() => (id.value === activeTab.value));
const handleTabActive = inject('handleTabActive') as (event: Event, name: string) => void;

const tab = ref<HTMLElement | null>(null);
const setActiveHTMLElement = inject('setActiveHTMLElement') as (element: HTMLElement | null) => void;
onMounted(async () => {
  if (isActive.value) {
    setActiveHTMLElement(tab.value);
    return;
  }
  if (hasActiveTab.value) {
    return;
  }
  activeTab.value = props.name;
});
</script>

<style lang="scss">
@use "../../../../styles/functions";

.ui-tabs-item {
  $this: &;
  $element: tabs-item;

  display: contents;

  &__tab {
    flex: functions.var($element + "-tab", flex, 0 0 auto);
    padding: functions.var($element + "-tab", padding, var(--space-16) 0);
    margin: functions.var($element + "-tab", margin, 0 var(--space-24) 0 0);

    [dir="rtl"] & {
      margin: functions.var($element + "-rtl-tab", margin, 0 0 0 var(--space-24));
    }

    #{$this}:first-of-type & {
      position: relative;

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: functions.var($element + "-indicator", height, 2px);
        background: functions.var($element + "-indicator", background, var(--color-border-selection));
        content: "";
        transform: translate3d(var(--_tabs-indicator-offset-x), 0, 0) scale3d(var(--_tabs-indicator-scale-x), 1, 1);
        transform-origin: left;
        transition: transform 150ms ease-in-out;

        [dir="rtl"] & {
          transform-origin: right;
        }
      }
    }

    #{$this}:last-of-type & {
      margin: functions.var($element + "-tab", margin, 0);
    }
  }

  &__tab-button {
    --button-color: #{functions.var($element + "-tab-button", color, var(--color-text-action-primary))};
    --button-hover-color: #{functions.var($element + "-tab-button-hover", color, var(--color-text-action-primary-hover))};
    --button-active-color: #{functions.var($element + "-tab-button-active", color, var(--color-text-action-primary-active))};
    --button-font: #{functions.var($element + "-tab-button", font, var(--font-body-1))};
    --button-letter-spacing: #{functions.var($element + "-tab-button", letter-spacing, var(--letter-spacing-body-1))};

    width: 100%;
  }

  &__content {
    position: relative;
    flex: 0 0 100%;
    order: 1;
    padding: functions.var($element + "-content", padding, var(--space-16) var(--space-20));
    margin: functions.var($element + "-content", margin, 0 calc(var(--space-20) * -1));

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border: solid functions.var($element + "-content", border-color, var(--color-border-divider));
      border-width: functions.var($element + "-content", border-width, 1px 0 0);
      content: "";
    }
  }

  &--is-active {
    #{$this}__tab-button {
      --button-color: #{functions.var($element + "-active-tab-button", color, var(--color-text-body))};
      --button-hover-color: #{functions.var($element + "-active-tab-button-hover", color, var(--color-text-body))};
      --button-active-color: #{functions.var($element + "-active-tab-button-active", color, var(--color-text-body))};
      --button-font: #{functions.var($element + "-active-tab-button", font, var(--font-body-1-thick))};
      --button-letter-spacing:
        #{functions.var(
          $element + "-active-tab-button",
          letter-spacing,
          var(--letter-spacing-body-1-thick)
        )};
    }
  }
}
</style>
