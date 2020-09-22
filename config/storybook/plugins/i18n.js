import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default new VueI18n({
  fallbackLocale: 'en',
  fallbackRoot: true,
  locale: 'en',
  silentTranslationWarn: false,
  silentFallbackWarn: false,
  messages: {},
});
