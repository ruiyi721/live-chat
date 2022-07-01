<template>
  <div>
    <i class="icon-warn"></i>
    <button @click="getProducts()">test</button>
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
