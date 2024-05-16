/* eslint-disable import/prefer-default-export, no-underscore-dangle, no-param-reassign, no-shadow, consistent-return */
import { nextTick } from 'vue';
import type { Directive } from 'vue';

interface BodyScrollLock extends HTMLElement {
  '__vueScrollPosition__'?: {
    left: number;
    top: number;
  }
}
interface WindowScrollLock extends Window {
  'IS_STORYBOOK'?: boolean;
}

const disableBodyScroll = () => {
  const body: BodyScrollLock = document.body;
  const scrollWidth = window.innerWidth - body.clientWidth;
  const {
    pageXOffset: x, pageYOffset: y,
  } = window;
  body.__vueScrollPosition__ = {
    left: x,
    top: y,
  };
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${y}px`;
  body.style.width = '100%';
  body.style.paddingRight = `${scrollWidth}px`;
};

const enableBodyScroll = (preventScroll = false) => {
  const body: BodyScrollLock = document.body;
  body.style.removeProperty('overflow');
  body.style.removeProperty('position');
  body.style.removeProperty('top');
  body.style.removeProperty('width');
  body.style.removeProperty('padding-right');
  if (preventScroll) return;
  if (body.__vueScrollPosition__) {
    window.scrollTo(body.__vueScrollPosition__);
  }
};
const isStorybook = ('STORYBOOK_ENV' in window);
const isDocsViewMode = window.location.search.includes('--docs');

export const bodyScrollLock: Directive = {
  async beforeMount() {
    await nextTick();
    if (isStorybook && isDocsViewMode) {
      // required to fix back from story to docs mode and unlock body scroll
      enableBodyScroll(true);
      return;
    }
    disableBodyScroll();
  },
  beforeUnmount() {
    if (isStorybook && isDocsViewMode) return;
    enableBodyScroll();
  },
};
