<template>
  <UiList class="ui-multiple-choices">
    <template
      v-for="choice in choices"
      :key="choice.id"
    >
      <!-- @slot Use this slot to replace list-item template.-->
      <slot
        name="list-item"
        v-bind="{choice, evidences, updateHandler}"
      >
        <UiListItem class="ui-multiple-choices__list-item">
          <!-- @slot Use this slot to replace choice-item template.-->
          <slot
            name="choice-item"
            v-bind="{choice, evidences, updateHandler}"
          >
            <UiMultipleChoicesItem
              :choice="choice"
              :options="options"
              :model-value="evidences"
              @update:modelValue="updateHandler($event)"
            />
          </slot>
        </UiListItem>
      </slot>
    </template>
  </UiList>
</template>

<script>
import { computed } from 'vue';
import UiMultipleChoicesItem from './_internal/UiMultipleChoicesItem.vue';
import UiList from '../UiList/UiList.vue';
import UiListItem from '../UiList/_internal/UiListItem.vue';

export default {
  name: 'UiMultipleChoices',
  components: { UiMultipleChoicesItem, UiList, UiListItem },
  props: {
    /**
     *  Use this props to set source of evidences.
     */
    source: {
      type: String,
      default: 'initial',
    },
    /**
     *  Use this props to override default options.
     */
    options: {
      type: Array,
      default: () => ([
        { name: 'Yes', value: 'present' },
        { name: 'No', value: 'absent' },
        { name: 'Don\'t know', value: 'unknown' },
      ]),
    },
    /**
     *  Use this props to set possible choices.
     */
    choices: {
      type: Array,
      default: () => ([]),
    },
    /**
     *  Use this props or v-model to set checked.
     */
    modelValue: {
      type: Array,
      default: () => ([]),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const evidences = computed(() => (
      props.modelValue.reduce(
        (obj, evidence) => ({ ...obj, [evidence.id]: evidence }), {},
      )
    ));
    function updateHandler(value) {
      emit('update:modelValue', Object.values(value).map((evidence) => ({ ...evidence, source: props.source })));
    }
    return {
      evidences,
      updateHandler,
    };
  },
};
</script>

<style lang="scss">
.ui-multiple-choices {
  --list-item-padding: 0;

  &__list-item {
    margin: var(--multiple-choices-list-item-margin, 8px 0 0 0);
    border:
      var(
        --multiple-choices-list-item-border,
        solid var(--color-border-subtle)
      );
    border-width: var(--multiple-choices-list-item-border-width, 0 0 1px 0);

    &:last-of-type {
      border-width: var(--multiple-choices-list-item-border-width, 0);
    }

    &:hover {
      background: var(--multiple-choices-list-item-hover-background);
    }
  }

  @media (min-width: 480px) {
    --list-item-padding: var(--space-12) var(--space-8);
    --multiple-choices-list-item-margin: 0;
    --multiple-choices-list-item-hover-background: var(--color-gray-50);
  }
}
</style>
