import { computed } from "vue"
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useI18n } from 'vue-i18n';
import { PublicApi } from '@/base/apis/public';
import { ILogin } from "@/base/apis/interfaces/public";

interface ILoginFormData {
  account: string,
  password: string
}

interface ILoginFormOpts {
  onSubmitCallback?: (res: ILogin) => void;
}

export function useLoginForm(opts: ILoginFormOpts = {}) {
  const { t } = useI18n();

  const validationSchema = computed(() => {
    const schema = {
      account: string().required().label(t('form.account')),
      password: string().required().label(t('form.password'))
    };

    return object(schema);
  });

  const initialValues: ILoginFormData = {
    account: '',
    password: '',
  };

  const { values, errors, handleSubmit, isSubmitting, resetForm } = useForm<ILoginFormData>({
    initialValues,
    validationSchema,
  });

  Object.keys(initialValues).every((key) => useField(key)); // 批量設置 useField響應

  const onSubmit = handleSubmit(async (values) => {
    const res = await PublicApi.login({
      account: values.account,
      password: values.password,
    });
    opts.onSubmitCallback && opts.onSubmitCallback(res);
  });

  return {
    form: values,
    errors,
    onSubmit,
    handleSubmit,
    isSubmitting,
    resetForm,
  }
}

export default useLoginForm;