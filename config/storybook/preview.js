import { addDecorator } from '@storybook/vue';
import i18n from './plugins/i18n';

addDecorator(() => ({
  i18n,
  beforeCreate() {
    this.$root._i18n = this.$i18n;
  },
  template: '<story/>',
}));

export const parameters = {
  a11y: {
    element: '#root',
  },
};
