import locale, { LocaleObject } from 'yup/lib/locale';

export default Object.assign(Object.create(null), { ...locale }) as LocaleObject;