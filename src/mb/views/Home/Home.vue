<template>
  <div class="d-flex">
    <i class="icon-warn text-color-yellow ft-30"></i>
    <select v-model="locale">
      <option value="zhtw">繁體中文</option>
      <option value="en">English</option>
    </select>
  </div>
  <p v-if="isLogin">登入中</p>
  <button class="border" @click="checkAuth">測試驗證</button>
  <button class="border" @click="logout">登出</button>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from "vue";
import { useI18n } from 'vue-i18n';
import { PublicApi } from '@/base/apis/public';
import { appEmitter, AppEvents } from '@/base/utils/event';
import useBaseStore from '@/base/store';
import { loadLanguage } from '@/base/i18n';

export default defineComponent({
  setup() {
    const { locale } = useI18n();
    const store = useBaseStore();

    const isLogin = computed<boolean>(() => store.isLogin);

    // const localeOptions = readonly(container.localeItems);

    // async function getProducts() {
    //   const res = await PublicApi.getProducts();
    //   if (!res) {
    //     return
    //   }
    //   console.log(res);
    // }

    async function checkAuth() {
      const res = await PublicApi.checkAuth();
      if(!res) {
        return
      }
      console.log(res, 'vue home checkauth api');
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
      locale,
      isLogin,

      logout,
      checkAuth,
    };
  },
});
</script>
