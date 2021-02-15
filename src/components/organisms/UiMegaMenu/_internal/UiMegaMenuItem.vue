<template>
  <!-- @slot Use this slot to replace trigger template. -->
  <slot
    name="trigger"
    v-bind="{toggleHandler, title, goToHandler}"
  >
    <UiButton
      ref="trigger"
      class="ui-mega-menu-item__trigger"
      @click="goToHandler"
    >
      {{ title }}
    </UiButton>
  </slot>
  <!-- @slot Use this slot to replace content template. -->
  <slot
    name="content"
    v-bind="{toggleHandler, isOpen, name, backHandler}"
  >
    <div
      v-if="isOpen"
      ref="content"
      class="ui-mega-menu-item__content"
    >
      <!-- @slot Use this slot to place content inside MegaMenuItem. -->
      <slot v-bind="{toggleHandler, isOpen, name, backHandler}" />
    </div>
  </slot>
</template>

<script>
import {
  ref, computed, watchEffect, inject, nextTick,
} from 'vue';
import UiButton from '../../../atoms/UiButton/UiButton.vue';

export default {
  name: 'UiMegaMenuItem.vue',
  components: {
    UiButton,
  },
  props: {
    /**
     * Use this props to set item name.
     */
    name: {
      type: String,
      default: '',
    },
    /**
     * Use this props to set item title.
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * Use this props to set content element when you override it by slot.
     */
    refContent: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const content = ref(null);
    const trigger = ref(null);
    const opened = inject('opened');
    const toggleHandler = inject('toggleHandler');
    const goToHandler = toggleHandler.bind(this, props.name);
    const backHandler = toggleHandler.bind(this, props.name);
    const minHeight = inject('minHeight');
    const isOpen = computed(() => (opened.value.includes(props.name)));
    const element = computed(() => (content.value || props.refContent));
    const setMiHeight = () => {
      const { height } = element.value.getBoundingClientRect();
      minHeight.value = height;
    };
    watchEffect(async () => {
      if (isOpen.value) {
        await nextTick();
        setMiHeight();
        window.addEventListener('resize', setMiHeight);
      } else {
        window.removeEventListener('resize', setMiHeight);
      }
    });
    return {
      trigger,
      content,
      toggleHandler,
      goToHandler,
      backHandler,
      isOpen,
    };
  },
};
</script>

<style lang="scss">
.ui-mega-menu-item {
  &__trigger {
    width: 100%;
  }

  &__content {
    position: absolute;
    top: 0;
    width: 100%;
    transform: translateX(100%);
  }
}
</style>
