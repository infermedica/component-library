import { actions } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import { customRef, provide } from 'vue';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
});

export const withModelValue = (story) => {
  const [args, updateArgs] = useArgs();
  return ({
    components: { story },
    setup() {
      const vModel = (value) => customRef((track, trigger) => ({
        get: () => {
          track();
          return value;
        },
        set: (newValue) => {
          value = newValue;
          updateArgs({
            ...args,
            modelValue: value
          });
          events.onUpdateModelValue(value);
          trigger()
        }
      }))
      provide('modelValue', vModel(args.modelValue))
    },
    template: `<story />`
  })
}
