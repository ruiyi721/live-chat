<template>
  <div>
    <i class="icon-warn"></i>
    <button @click="getProducts()">test</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    function getProducts() {
      const api = "https://vue-course-api.hexschool.io/api/dora/products";
      axios.get(api).then((res) => {
        console.log(res.data.products);
      });
    }

    return {
      getProducts,
    };
  },
});
</script>
