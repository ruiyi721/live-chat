<template>
  <div class="d-flex">
    <i class="icon-warn text-color-yellow ft-30"></i>
    <button @click="getProducts()">test</button>
    <select v-model="locale">
      <option value="zhtw">繁體中文</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useI18n } from 'vue-i18n';
import { PublicApi } from '@/base/apis/public';

export default defineComponent({
  setup() {
    const { locale } = useI18n();

    async function getProducts() {
      const res = await PublicApi.getProducts();
      if (!res) {
        return
      }
      console.log(res);
    }

    watch(locale, (newlocale) => {
      localStorage.setItem("lang", newlocale);
    });

    return {
      locale,
      getProducts,
    };
  },
});
</script>
