import { computed } from "vue"
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useI18n } from 'vue-i18n';
import { PublicApi } from '@/base/apis/public';

interface IRegisterFormData {
  account: string,
  password: string
}

interface IRegisterFormOpts {
  onSubmitCallback?: (res: { success: boolean }) => void;
}

export function useRegisterForm(opts: IRegisterFormOpts = {}) {
  const { t } = useI18n();

  const validationSchema = computed(() => {
    const schema = {
      account: string().required().label(t('form.account')),
      password: string().required().label(t('form.password'))
    };

    return object(schema);
  });

  const initialValues: IRegisterFormData = {
    account: '',
    password: '',
  };

  const { isSubmitting, handleSubmit, errors, values, resetForm } = useForm<IRegisterFormData>({
    initialValues,
    validationSchema,
  });

  Object.keys(initialValues).every((key) => useField(key));

  const onSubmit = handleSubmit(async (values) => {
    const res = await PublicApi.register({
      account: values.account,
      password: values.password
    });
    opts.onSubmitCallback && opts.onSubmitCallback(res);
  });

  return {
    form: values,
    errors,
    isSubmitting,
    onSubmit,
    resetForm,
  };
}

export default useRegisterForm;