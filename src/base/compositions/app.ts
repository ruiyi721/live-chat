import { DefineComponent } from 'vue';
import { appEmitter, AppEvents } from '@/base/utils/event';
import useVfm from './vfm';

interface UseAppOptions {
  modalComponent?: DefineComponent<any, any, any>,
}

export function useApp(opts: UseAppOptions = { }) {
  const $vfm = useVfm();

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

  return {
  };
}

export default useApp;