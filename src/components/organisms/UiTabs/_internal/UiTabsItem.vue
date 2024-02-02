<template>
  <div
    class="ui-tabs-item"
    :class="{ 'ui-tabs-item--is-active': isActive }"
  >
    <!-- @slot Use this slot to replace tab template. -->
    <slot
      name="tab"
      v-bind="{
        id,
        isActive,
        buttonTabAttrs,
        contentAttrs,
        handleTabActive,
        title,
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
            buttonTabAttrs,
            handleTabActive,
            title,
          }"
        >
          <UiButton
            :id="`button-${id}`"
            :aria-expanded="`${isActive}`"
            :aria-controls="id"
            v-bind="buttonTabAttrs"
            class="ui-button--text ui-tabs-item__tab-button"
            @click="handleTabActive(id)"
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
        contentAttrs,
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
  watch,
} from 'vue';
import type { Ref } from 'vue';
import { uid } from 'uid/single';
import UiButton from '../../../atoms/UiButton/UiButton.vue';
import type {
  TabsHandleTabActive,
  TabsSetActiveElement,
} from '../UiTabs.vue';
import type { ButtonAttrsProps } from '../../../atoms/UiButton/UiButton.vue';
import type { DefineAttrsProps } from '../../../../types';

export interface TabsItemProps {
  /**
   * Use this props to set item title.
   */
  title?: string;
  /**
   * Use this props to set item name, it used to toggle.
   */
  name?: string;
  /**
   * Use this props to pass attrs for toggle UiButton.
   */
  buttonTabAttrs?: ButtonAttrsProps;
  /**
   * Use this props to pass attrs for content element.
   */
  contentAttrs?: DefineAttrsProps<null>,
}
export type TabsItemAttrsProps = DefineAttrsProps<TabsItemProps>;

const props = withDefaults(defineProps<TabsItemProps>(), {
  title: '',
  name: '',
  buttonTabAttrs: () => ({}),
  contentAttrs: () => ({}),
});
const attrs: TabsItemAttrsProps = useAttrs();
const activeTab = inject<Ref<string>>('activeTab', ref(''));
const hasActiveTab = computed(() => (!!activeTab.value));
const id = computed(() => (props.name || attrs.id || `tab-${uid()}`));
// eslint-disable-next-line @typescript-eslint/no-empty-function
const setActiveHTMLElement = inject<TabsSetActiveElement>('setActiveHTMLElement', () => {});
const tab = ref<HTMLElement | null>(null);
const isActive = computed(() => (id.value === activeTab.value));
watch(() => isActive.value, (value) => {
  if (value) {
    setActiveHTMLElement(tab.value);
  }
});
// eslint-disable-next-line @typescript-eslint/no-empty-function
const handleTabActive = inject<TabsHandleTabActive>('handleTabActive', () => {});
onMounted(() => {
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
@use "../../../../styles/mixins";

.ui-tabs-item {
  $this: &;
  $element: tabs-item;

  display: contents;

  &__tab {
    @include mixins.use-logical($element + "-tab", padding, var(--space-16) 0);
    @include mixins.use-logical($element + "-tab", margin, 0 var(--space-24) 0 0);

    flex: functions.var($element + "-tab", flex, 0 0 auto);

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
        transform: translate3d(var(--_tabs-indicator-offset-x), var(--_tabs-indicator-offset-y), 0) scale3d(var(--_tabs-indicator-scale-x), 1, 1);
        transform-origin: left;
        transition: transform 150ms ease-in-out;
      }
    }

    #{$this}:last-of-type & {
      @include mixins.use-logical($element + "-tab", margin, 0);
    }
  }

  &__tab-button {
    --button-color: #{functions.var($element + "-tab-button", color, var(--color-text-action-primary))};
    --button-hover-color:
      #{functions.var(
        $element + "-tab-button-hover",
        color,
        var(--color-text-action-primary-hover)
      )};
    --button-active-color:
      #{functions.var(
        $element + "-tab-button-active",
        color,
        var(--color-text-action-primary-active)
      )};
    --button-font: #{functions.var($element + "-tab-button", font, var(--font-body-1))};
    --button-letter-spacing: #{functions.var($element + "-tab-button", letter-spacing, var(--letter-spacing-body-1))};

    width: 100%;
  }

  &__content {
    @include mixins.use-logical($element + "-content", padding, var(--space-16) var(--space-20));
    @include mixins.use-logical($element + "-content", margin, 0 calc(var(--space-20) * -1));

    position: relative;
    flex: 0 0 100%;
    order: 1;

    &::before {
      @include mixins.use-logical($element + "-content", border-style, solid);
      @include mixins.use-logical($element + "-content", border-color, var(--color-border-divider));
      @include mixins.use-logical($element + "-content", border-width, 1px 0 0);

      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
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
