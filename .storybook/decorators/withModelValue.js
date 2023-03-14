import { actions } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import { customRef } from 'vue';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
});

export const withModelValue = (story, context) => {
    const [{ modelValue }, updateArgs] = useArgs();
    const vModel = (value = modelValue) => customRef((track, trigger) => ({
      get: () => {
        track();
        return value;
      },
      set: (newValue) => {
        if (context.argTypes.modelValue.control.disable) return;
        value = newValue;
        updateArgs({ modelValue: newValue });
        events.onUpdateModelValue(newValue);
        trigger()
      }
    }))
    return story({
      ...context,
      modelValue: vModel(modelValue),
    })
  }