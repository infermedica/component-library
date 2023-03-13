import { actions } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';

const events = actions({
  onUpdateModelValue: 'update:modelValue',
});

export const withModelValue = (story, context) => {
  const updateArgs = useArgs()[1];
  const updateModelValue = (value) => {
    updateArgs({
      ...context.args,
      modelValue: value
    }),
    events.onUpdateModelValue(value)
  }
  return story({
    ...context,
    updateModelValue,
  })
}
