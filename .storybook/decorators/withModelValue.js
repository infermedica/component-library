import { actions } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';
import { defineComponent, ref, watch } from 'vue';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
});

export const withModelValue = (story, context) => {
  const [{ modelValue }, updateArgs] = useArgs();
  return defineComponent({
    component: { story },
    props: [ 'modelValue'],
    setup() {
      const value = ref(modelValue);
      watch(
        () => value.value,
        (newValue) => {
          if (context.argTypes.modelValue.control.disable) return;
          value.value = newValue;
          updateArgs({ modelValue: newValue });
          events.onUpdateModelValue(newValue);
        }
      );
      return {
        value
      }
    },
    template: `<story v-model="value"/>`
  });
};
