import { Langs, LangLabels } from "@/base/enums";

export const apiUrl: string = process.env.VUE_APP_API_URL || '';

export const appTitle: string = process.env.VUE_APP_TITLE || 'App';

export const baseUrl: string = process.env.BASE_URL || '';

export const container = {
  localeItems: [
    {
      key: Langs.ZH_TW,
      label: LangLabels.ZH_TW,
    },
    {
      key: Langs.EN,
      label: LangLabels.EN,
    },
  ],
};