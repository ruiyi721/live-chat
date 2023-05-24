import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

interface ILocaleOpts {
  onLocaleChange?: (locale: string) => void;
}

export function useLocale(opts: ILocaleOpts = { }) {
  const { locale } = useI18n();

  watch(locale, (n, p) => {
    opts.onLocaleChange && opts.onLocaleChange(n);
  });

  return {
    locale
  };
}

export default useLocale;