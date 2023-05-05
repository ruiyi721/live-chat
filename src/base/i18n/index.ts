import { createI18n } from 'vue-i18n'
import en from './en'
import zhtw from './zhtw'

let  messages = {};
messages = { en, zhtw };
const lang = localStorage.getItem('lang') || 'zhtw';

const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: "zhtw",
  messages: messages
});

export default i18n;