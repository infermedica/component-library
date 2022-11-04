<template>
  <div
    :class="[
      'ui-horizontal-paging', { 'ui-horizontal-paging--nested': isNested }
    ]"
  >
    <!-- @slot Use this slot to replace header template. -->
    <slot
      v-if="isHeaderDisplayed"
      name="header"
    >
      <div class="ui-horizontal-paging__header">
        <!-- @slot Use this slot to replace back-button template. -->
        <slot
          name="back-button"
          v-bind="{
            isActive,
            buttonBackAttrs,
            handleBackClick,
          }"
        >
          <UiButton
            v-if="isActive"
            v-bind="buttonBackAttrs"
            class="ui-button--icon ui-horizontal-paging__back"
            @click="handleBackClick"
          >
            <UiIcon
              v-bind="defaultProps.iconBackAttrs"
              class="ui-button__icon"
            />
            <span class="visual-hidden">{{ defaultProps.translation.back }} {{ backToTitle }}</span>
          </UiButton>
        </slot>
        <!-- @slot Use this slot to replace title template. -->
        <slot
          name="title"
          v-bind="{
            headingTitleAttrs,
            title: currentTitle
          }"
        >
          <UiHeading v-bind="headingTitleAttrs">
            {{ currentTitle }}
          </UiHeading>
        </slot>
      </div>
    </slot>
    <div class="ui-horizontal-paging__wrapper">
      <div
        :class="[
          'ui-horizontal-paging__section', { 'ui-horizontal-paging__section--is-active': isActive }
        ]"
      >
        <!-- @slot Use this slot to replace menu template. -->
        <slot
          name="menu"
          v-bind="{ items: menuItems }"
        >
          <UiMenu
            :items="menuItems"
            class="ui-horizontal-paging__menu"
          />
        </slot>
        <!-- @slot Use this slot to replace content template. -->
        <slot name="content">
          <div class="ui-horizontal-paging__content">
            <!-- @slot Use this slot to place inside pages items. -->
            <slot>
              <template
                v-for="(item, key) in items"
                :key="key"
              >
                <UiHorizontalPagingItem
                  :label="item.label"
                  :title="item.title"
                  :name="item.name"
                >
                  <slot
                    v-bind="{ item }"
                    :name="item.name"
                  />
                </UiHorizontalPagingItem>
              </template>
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  provide,
  inject,
} from 'vue';
import type { PropType } from 'vue';
import type { PropsAttrs } from '@/types/attrs';
import type { Icon } from '../../../types/icon';
import type {
  MenuSuffixVisible,
  MenuItem,
} from '../UiMenu/UiMenu.vue';
import UiButton from '../../atoms/UiButton/UiButton.vue';
import UiIcon from '../../atoms/UiIcon/UiIcon.vue';
import UiHeading from '../../atoms/UiHeading/UiHeading.vue';
import UiMenu from '../UiMenu/UiMenu.vue';
import UiHorizontalPagingItem from './_internal/UiHorizontalPagingtem.vue';

export interface HorizontalPagingItem {
  label: string;
  title: string;
  name?: string;
  [key: string]: unknown;
}

const props = defineProps({
  modelValue: {
    type: [
      Array,
      Object,
    ] as PropType<HorizontalPagingItem[] | HorizontalPagingItem>,
    default: () => ([]),
  },
  /**
   * Use this props to set inside pages title.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Use this props to pass inside pages items.
   */
  items: {
    type: Array as PropType<HorizontalPagingItem[]>,
    default: () => ([]),
  },
  /**
   * Use this props to display inside pages header.
   */
  hasHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * Use this props to pass attrs for back UiButton
   */
  buttonBackAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass attrs for back button UiIcon
   */
  iconBackAttrs: {
    type: Object as PropsAttrs,
    default: () => ({ icon: 'chevron-left' }),
  },
  /**
   * Use this props to pass attrs for title UiHeading
   */
  headingTitleAttrs: {
    type: Object as PropsAttrs,
    default: () => ({}),
  },
  /**
   * Use this props to pass labels inside component translation.
   */
  translation: {
    type: Object,
    default: () => ({ back: 'Back to' }),
  },
});
const defaultProps = computed(() => ({
  translation: {
    back: 'Back to',
    ...props.translation,
  },
  iconBackAttrs: {
    icon: 'chevron-left' as Icon,
    ...props.iconBackAttrs,
  },
}
));

const emit = defineEmits<{(event: 'update:modelValue', value: HorizontalPagingItem[]): void;
}>();

const index = inject('index', 0);
provide('index', index + 1);
const isNested = computed(() => index > 0);
const isHeaderDisplayed = computed(() => (props.hasHeader && !isNested.value));

const activeItems = inject('activeItems', computed({
  get: () => (Array.isArray(props.modelValue)
    ? props.modelValue
    : [ props.modelValue ]),
  set: (value) => { emit('update:modelValue', value); },
}));
provide('activeItems', activeItems);
const sizeOfActiveItems = computed(() => (activeItems.value.length));
const activeItem = computed<HorizontalPagingItem>(() => (activeItems.value[index] || {}));
const isActive = computed(() => (Object.keys(activeItem.value).length > 0));
const activeItemName = computed(() => activeItem.value?.name || '');
provide('activeItemName', activeItemName);
const currentTitle = computed(() => (activeItems.value[sizeOfActiveItems.value - 1]?.title || props.title));
const backToTitle = computed(() => (activeItems.value[sizeOfActiveItems.value - 2]?.title || props.title));

const itemsToHandle = ref<Record<string, HorizontalPagingItem>>({});
provide('items', itemsToHandle);
const itemsAsArray = computed<HorizontalPagingItem[]>(() => (Object.values(itemsToHandle.value)));
const menuItems = computed<MenuItem[]>(() => {
  const additionalAttrs = {
    icon: 'chevron-right' as Icon,
    suffixVisible: 'always' as MenuSuffixVisible,
    class: 'ui-button--theme-secondary',
  };
  return itemsAsArray.value.map((item) => {
    const {
      title,
      ...rest
    } = item;
    return {
      ...additionalAttrs,
      onClick: () => {
        activeItems.value = [
          ...activeItems.value,
          item,
        ];
      },
      ...rest,
    };
  });
});

const handleBackClick = () => {
  activeItems.value = activeItems.value.slice(0, -1);
};
</script>

<style lang="scss">
@use "../../../styles/functions";
@use "../../../styles/mixins";

.ui-horizontal-paging {
  $element: inside-pages;

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: functions.var($element + "-header", padding, var(--space-24) var(--space-20));
    background: functions.var($element + "-header", background, var(--color-background-subtle));
    gap: functions.var($element + "-header", gap, var(--space-12));
  }

  &__back {
    margin: functions.var($element + "-button-back", margin, 3px 0 0 0);

    @include mixins.from-tablet {
      margin: functions.var($element + "-tablet-button-back", margin, 6px 0 0 0);
    }
  }

  &__wrapper {
    overflow: hidden;
  }

  &__section {
    display: flex;
    transition: transform 150ms ease-in-out;

    &--is-active {
      transform: translate3d(-100%, 0, 0);
    }
  }

  &__menu {
    flex: 0 0 100%;
    padding: functions.var($element + "-menu", padding, var(--space-12) var(--space-4));
  }

  &__content {
    flex: 0 0 100%;
    padding: functions.var($element + "-content", padding, var(--space-24) var(--space-20));
  }

  &--nested {
    margin: calc(var(--space-24) * -1) calc(var(--space-20) * -1);
  }
}
</style>
