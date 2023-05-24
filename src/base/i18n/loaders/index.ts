import type { LocaleObject } from 'yup/lib/locale';
import { Langs } from '@/base/enums';

type KeyValueObject<T = any> = { [key: string]: T };

export interface ILoaderItem {
  /**
   * Yup套件文本
   */
  yup: LocaleObject,
}

export default {
  [Langs.ZH_TW]: () => import('./zhtw'),
  [Langs.EN]   : () => import('./en'),
} as KeyValueObject<() => Promise<{ default: ILoaderItem }>>;