export const modifiers = ({ options, multiselect = true }) => {
  const control = multiselect ? 'multi-select' : 'select';

  return {
    name: 'class',
    description: 'Use this control to add modifier to class.',
    table: { category: 'html attributes' },
    control,
    options
  }
}
