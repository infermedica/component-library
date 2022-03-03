/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, func-names */
import { nextTick } from 'vue';
import { getFocusableElements } from '../focus-trap/helpers';

export const focusFirst = {
  async beforeMount(el) {
    await nextTick();
    getFocusableElements(el)
      .at(0)
      .focus();
  },
};
