export const content = {
  description: 'Use this control to set the content.',
  table: {
    category: 'stories controls',
  },
  control: 'text',
};

export const modifiers = (config) => {
  const {options, control} = config
  return ({
    name: 'class',
    description: 'Use this control to add modifier to class.',
    table: {
      category: 'html attributes',
    },
    control: control || 'multi-select',
    options: options || [],
  })
}

export const placeholder = {
  description: 'Use this control to set placeholder attribute.',
  table: {
    category: 'html attributes',
  },
  control: 'text',
}

export const disabled = {
  description: 'Use this control to set disabled attribute.',
  table: {
    category: 'html attributes',
  },
  control: 'boolean',
}
