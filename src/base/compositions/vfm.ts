import { inject } from 'vue';
import { VueFinalModalProperty } from 'vue-final-modal';

export function useVfm() {
  return inject<VueFinalModalProperty>('$vfm');
}

export default useVfm;
