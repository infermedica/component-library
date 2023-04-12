export const variable = ({ defaultValue:summary }) => (
  {
    description: 'Use this control to set css variable.',
    table: {
      category: 'CSS Variables',
      defaultValue: {
        summary
      }
    },
    control: 'text',
  }
)
