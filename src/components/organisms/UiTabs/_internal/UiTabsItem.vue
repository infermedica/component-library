<template>
  <div
    class="ui-tabs-item"
    :class="{'ui-tabs-item--is-active': isActive}"
  >
    <!-- @slot Use this slot to replace tab template. -->
    <slot
      name="tab"
      v-bind="{id, isActive, buttonAttrs, handleTabActive, title}"
    >
      <div
        ref="tab"
        class="ui-tabs-item__tab"
      >
        <!-- @slot Use this slot to replace tab-button template. -->
        <slot
          name="tab-button"
          v-bind="{id, isActive, attrs:buttonAttrs, handleTabActive, title}"
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
      v-bind="{isActive}"
    >
      <div
        v-show="isActive"
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

<script setup>
import {
  ref, computed, onMounted, inject, useAttrs,
} from 'vue';
import { uid } from 'uid/single';
import UiButton from '../../../atoms/UiButton/UiButton.vue';

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
    type: Object,
    default: () => ({}),
  },
});
const attrs = useAttrs();
const activeTab = inject('activeTab');
const hasActiveTab = computed(() => (activeTab.value));

const id = computed(() => (props.name || attrs.id || `tab-${uid()}`));
const isActive = computed(() => (id.value === activeTab.value));
const handleTabActive = inject('handleTabActive');

const tab = ref(null);
const item = ref(null);
const setActiveHTMLElement = inject('setActiveHTMLElement');
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
@import "../../../../styles/mixins/mixins";

.ui-tabs-item {
  $this: &;

  display: contents;

  &__tab {
    flex: var(--tabs-item-tab-flex, 0 0 auto);
    padding: var(--tabs-item-tab-padding, var(--space-16) 0);
    margin: var(--tabs-item-tab-margin, 0 var(--space-24) 0 0);

    [dir="rtl"] & {
      margin: var(--tabs-item-tab-margin, 0 0 0 var(--space-24));
    }
  }

  &__tab-button {
    --button-color: var(--tabs-item-tab-button-color, var(--color-text-action-primary));
    --button-hover-color: var(--tabs-item-tab-button-hover-color, var(--color-text-action-secondary-hover));
    --button-active-color: var(--tabs-item-tab-button-active-color, var(--color-text-action-secondary-active));

    width: 100%;
  }

  &__content {
    position: relative;
    flex: 0 0 100%;
    order: 1;
    padding: var(--tabs-item-content-padding, var(--space-16) var(--space-20));
    margin: var(--tabs-item-content-margin, 0 calc(var(--space-20) * -1));

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border: solid #e7ebef;
      border-width: 1px 0 0;
      content: "";
    }
  }

  &:first-of-type {
    #{$this} {
      &__tab {
        position: relative;

        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--tabs-underline-color, var(--color-border-selection));
          content: "";
          transform: translateX(var(--tabs-underline-offset-x, 0)) scaleX(var(--tabs-underline-scale));
          transform-origin: left;
          transition: transform 150ms ease-in-out;

          [dir="rtl"] & {
            transform-origin: right;
          }
        }
      }
    }
  }

  &:last-of-type {
    #{$this} {
      &__tab {
        margin: var(--tabs-item-tab-last-margin, 0);
      }
    }
  }

  &--is-active {
    #{$this}__tab-button {
      @include font(body-1-thick);

      --button-color: var(--tabs-item-tab-button-active-color, var(--color-text-body));
      --button-hover-color: var(--tabs-item-tab-button-active-hover-color, var(--color-text-body));
      --button-active-color: var(--tabs-item-tab-button-active-active-color, var(--color-text-body));
    }
  }
}
</style>
