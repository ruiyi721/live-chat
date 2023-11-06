<template>
  <div class="header-area">
    <select v-model="locale" class="lang-select">
      <option value="zhtw">繁體中文</option>
      <option value="en">English</option>
    </select>
    <div class="d-flex align-items-center">
      <!-- <p v-if="isLogin" class="me-3">{{ $t('common.login_status') }}</p> -->
      <p class="me-3">{{ userId }}</p>
      <button class="logout-btn" @click="logout">{{ $t('common.logout') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from "vue";
import { useI18n } from 'vue-i18n';
import useVfm from "@/base/compositions/vfm";
import Modal from "@/mb/components/Modal.vue";
import { loadLanguage } from '@/base/i18n';
import useBaseStore from '@/base/store';
import { appEmitter, AppEvents } from '@/base/utils/event';

export default defineComponent({
  name: "HeaderComponent",
  setup() {
    const store = useBaseStore();
    const { locale } = useI18n();
    const $vfm = useVfm();
    
    const isLogin = computed<boolean>(() => store.isLogin);
    const userId  = computed<string>(() => store.config.userId);

    function showModal() {
      $vfm?.show({
        component: Modal,
				bind: {
					okCallBack: () => {}
				}
      });
    }

    async function logout() {
      if(!isLogin.value) {
        return;
      }
      appEmitter.emit(AppEvents.Logout);
    }

    watch(locale, (n) => {
      loadLanguage(n);
    });

    return {
      isLogin,
      locale,
      userId,

      logout
    };
  },
});
</script>

<style lang="scss" scoped>
.header-area {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.8rem;
  width: 100%;
  z-index: 1;
  @include flexbox(space-between);
}
.lang-select {
  background: transparent;
}

.logout-btn {
  border: 1px solid #777777;
  border-radius: 10rem;
  padding: 5px 10px;
}
</style>