<template>
  <div class="d-flex">
    <i class="icon-warn text-color-yellow ft-30"></i>
    <button @click="getProducts()">test</button>
    <div>123</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ProductApi } from '@/apis/product';

export default defineComponent({
  setup() {

    async function getProducts() {
      const res = await ProductApi.getProducts();
      if (!res) {
        return
      }
      console.log(res);
    }

    return {
      getProducts,
    };
  },
});
</script>
