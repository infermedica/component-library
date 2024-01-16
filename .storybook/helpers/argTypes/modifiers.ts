export const modifiers = ({ options, multiselect = true }) => {
  const control = multiselect ? 'multi-select' : 'select';
  if( options.length < 1) {
    return undefined;
  }

  return {
    name: 'class',
    description: 'Use this control to add modifier to class.',
    table: { category: 'html attributes' },
    control,
    options
  }
}
