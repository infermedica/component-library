export const variable = ({ subcategory, defaultValue:summary }) => (
  {
    description: 'Use this control to set css variable.',
    table: {
      category: 'CSS Variables',
      subcategory,
      defaultValue: {
        summary
      }
    },
    control: 'text',
  }
)
