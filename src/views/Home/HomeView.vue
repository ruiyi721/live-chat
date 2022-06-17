<template>
  <div>Dora</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log("123");
      console.log(process);
    });
    return {};
  },
});
</script>
