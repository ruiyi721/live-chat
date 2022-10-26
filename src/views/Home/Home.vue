<template>
  <div class="d-flex">
    <i class="icon-warn text-color-yellow ft-30"></i>
    <button @click="getProducts()">test</button>
    <div>123</div>
    <select v-model="locale">
      <option value="zhtw">繁體中文</option>
      <option value="en">英文</option>
    </select>
  </div>
  <div>{{ $t('common.login') }}</div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { useI18n } from 'vue-i18n';
import { ProductApi } from '@/apis/product';

export default defineComponent({
  setup() {
    const { locale } = useI18n();

    async function getProducts() {
      const res = await ProductApi.getProducts();
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
