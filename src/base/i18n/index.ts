import { createI18n } from 'vue-i18n'
import { setLocale as YupSetLocale } from 'yup';
import en from '@/base/langs/en'
import zhtw from '@/base/langs/zhtw'
import enYup from '@/base/langs/yup/en';
import twYup from '@/base/langs/yup/zhtw';

let messages = {};
messages = { en, zhtw };
const lang = localStorage.getItem('lang') || 'zhtw';

const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: "zhtw",
  messages: messages
});

switch(lang) {
  case 'zhtw':
    YupSetLocale(twYup);
    break;
  case 'en':
    YupSetLocale(enYup);
    break;
}

export default i18n;