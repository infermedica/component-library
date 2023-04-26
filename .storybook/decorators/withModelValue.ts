import { useArgs } from '@storybook/preview-api';
import { ref, watch } from 'vue';
import type { DecoratorFunction } from '@storybook/types';
import type { VueRenderer } from '@storybook/vue3';

export const withModelValue: DecoratorFunction<VueRenderer> = (
  story,
  { argTypes }
) => {
  const [{ modelValue }, updateArgs] = useArgs();
  return ({
    component: { story },
    props: [ 'modelValue'],
    setup() {
      const value = ref(modelValue);
      watch(
        () => value.value,
        (newValue) => {
          if (argTypes.modelValue.control.disable) return;
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
