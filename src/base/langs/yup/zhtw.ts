import type { ArrayLocale, BooleanLocale, DateLocale, LocaleObject, MixedLocale, NumberLocale, ObjectLocale, StringLocale } from 'yup/lib/locale';
import printValue from 'yup/lib/util/printValue';

export let mixed: Required<MixedLocale> = {
  default: '${path} 是無效的',
  required: '${path} 為必填',
  oneOf: '${path} 必須是以下的值之一: ${values}',
  notOneOf: '${path} 不得是以下的值之一: ${values}',
  notType: ({ path, type, value, originalValue }) => {
    let isCast = originalValue != null && originalValue !== value;
    let msg =
      `${path} must be a \`${type}\` type, ` +
      `but the final value was: \`${printValue(value, true)}\`` +
      (isCast
        ? ` (cast from the value \`${printValue(originalValue, true)}\`).`
        : '.');

    if (value === null) {
      msg += `\n If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``;
    }

    return msg;
  },
  defined: '${path}必須被定義',
};

export let string: Required<StringLocale> = {
  length: '${path} 必須為${length}個字元',
  min: '${path} 至少須${min}個字元',
  max: '${path} 不可大於${max}個字元',
  matches: '${path} 必須與"${regex}"格式相符',
  email: '${path} 必須是email',
  url: '${path} 必須是"網址"',
  uuid: '${path} 必須是"通用唯一辨識碼"',
  trim: '${path} 字段前後不得有空格',
  lowercase: '${path} 必須為小寫',
  uppercase: '${path} 必須為大寫',
};

export let number: Required<NumberLocale> = {
  min: '${path} 必須大於等於${min}',
  max: '${path} 必須小於等於${max}',
  lessThan: '${path} 必須小於${less}',
  moreThan: '${path} 必須大於${more}',
  positive: '${path} 必須為正數',
  negative: '${path} 必須為負數',
  integer: '${path} 必須為整數',
};

export let date: Required<DateLocale> = {
  min: '${path} 必須在"${min}"之後',
  max: '${path} 必須在"${max}"之前',
};

export let boolean: BooleanLocale = {
  isValue: '${path} 必須為${value}',
};

export let object: Required<ObjectLocale> = {
  noUnknown: '${path} 具有未指定的鍵: ${unknown}',
};

export let array: Required<ArrayLocale> = {
  min: '${path} 必須至少${min}個項目',
  max: '${path} 必須少於或等於${max}個項目',
  length: '${path} 必須為${length}個項目',
};

export default Object.assign(Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
}) as LocaleObject;