import { DefineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { appEmitter, AppEvents } from '@/base/utils/event';
import { useBaseStore } from '@/base/store';
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
      localStorage.removeItem('token');
      store.logout();
      router.push({ name: 'Login' });
    }
  })

  return {
  };
}

export default useApp;