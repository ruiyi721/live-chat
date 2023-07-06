<template>
  <div class="header-area">
    <select v-model="locale" class="lang-select">
      <option value="zhtw">繁體中文</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useI18n } from 'vue-i18n';
import useVfm from "@/base/compositions/vfm";
import Modal from "@/mb/components/Modal.vue";
import { loadLanguage } from '@/base/i18n';

export default defineComponent({
  name: "HeaderComponent",
  setup() {
    const { locale } = useI18n();
    const $vfm = useVfm();

    function test() {
      $vfm?.show({
        component: Modal,
				bind: {
					okCallBack: () => {}
				}
      });
    }

    watch(locale, (n) => {
      loadLanguage(n);
    });

    return {
      locale
    };
  },
});
</script>

<style lang="scss" scoped>
.header-area {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  width: 100%;
  z-index: 1;
}
.lang-select {
  background: transparent;
}
</style>