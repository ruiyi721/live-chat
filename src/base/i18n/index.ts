import { createI18n } from 'vue-i18n';
import { setLocale as YupSetLocale } from 'yup';
import loaders from './loaders';
import { Langs } from '@/base/enums';

import en from '@/base/langs/en';
import zhtw from '@/base/langs/zhtw';
import twYup from '@/base/langs/yup/zhtw';

const defaultLocale = Langs.ZH_TW;
// 套件語系注入
YupSetLocale(twYup);

let messages = {};
messages = { en, zhtw };
const lang = localStorage.getItem('lang') || 'zhtw';

const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: "zhtw",
  // 語言庫
  messages: messages
});

export async function loadLanguage(lang: string) {
  if (!lang) {
    return;
  }
  document.documentElement.lang = lang;
  const { default: localeItem } = await loaders[lang]();

  YupSetLocale(localeItem.yup);

  localStorage.setItem('lang', lang);
}

export function getLocaleInDevice(): string {
  const locale = localStorage.getItem('lang');
  if (!locale || !loaders[locale]) {
    return defaultLocale;
  }
  return locale;
}

export default i18n;