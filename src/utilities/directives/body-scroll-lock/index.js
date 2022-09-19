/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, no-shadow, consistent-return */
import { nextTick } from 'vue';

function disableBodyScroll() {
  const scrollWidth = window.innerWidth - document.body.clientWidth;
  const x = window.pageXOffset;
  const y = window.pageYOffset;
  document.body.__vueScrollPosition = [x, y];
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${y}px`;
  document.body.style.width = '100%';
  document.body.style.paddingRight = `${scrollWidth}px`;
}

function enableBodyScroll(preventScroll = false) {
  const {
    style,
  } = document.body;
  style.removeProperty('overflow');
  style.removeProperty('position');
  style.removeProperty('top');
  style.removeProperty('width');
  style.removeProperty('padding-right');
  if (preventScroll) { return; }
  window.scrollTo(...document.body.__vueScrollPosition);
}

export const bodyScrollLock = {
  async beforeMount() {
    await nextTick();
    if (window.IS_STORYBOOK && window.location.search.includes('viewMode=doc')) {
      // required to fix back from story to docs mode and unlock body scroll
      enableBodyScroll(true);
      return;
    }
    disableBodyScroll();
  },
  beforeUnmount() {
    if (window.IS_STORYBOOK && window.location.search.includes('viewMode=doc')) return;
    enableBodyScroll();
  },
};
