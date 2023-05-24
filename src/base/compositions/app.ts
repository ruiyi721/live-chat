import { DefineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { appEmitter, AppEvents } from '@/base/utils/event';
import { useBaseStore } from '@/base/store';
import { loadLanguage, getLocaleInDevice } from '@/base/i18n';
import useVfm from './vfm';

interface UseAppOptions {
  modalComponent?: DefineComponent<any, any, any>,
}

export function useApp(opts: UseAppOptions = { }) {
  const $vfm = useVfm();
  const store = useBaseStore();
  const { t } = useI18n();
  const router = useRouter();

  // App事件監聽
  appEmitter
  .on(AppEvents.Modal, (message: string) => {
    if (opts.modalComponent) {
      $vfm?.show({
        component: opts.modalComponent,
        bind: { message },
      });
    } else {
      alert(message);
    }
  })
  .on(AppEvents.Logout, () => {
    if(store.isLogin) {
      store.logout();
      router.push({ name: 'Login' });
    }
  })

  onMounted(async() => {
    await Promise.all([
      loadLanguage(getLocaleInDevice()),
    ]);
  });

  return {
  };
}

export default useApp;