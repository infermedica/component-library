import { useArgs } from '@storybook/preview-api';
import { defineComponent, ref, watch } from 'vue';

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
        }
      );
      return {
        value
      }
    },
    template: `<story v-model="value"/>`
  });
};
