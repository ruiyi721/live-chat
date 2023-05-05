<template>
  <div class="border">i am mb header</div>
  <button @click="test">test</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useVfm from "@/base/compositions/vfm";
import Modal from "@/mb/components/Modal.vue";

export default defineComponent({
  name: "HeaderComponent",
  setup() {
    const $vfm = useVfm();

    function test() {
      $vfm?.show({
        component: Modal,
				bind: {
					okCallBack: () => {
						console.log('123');
					}
				}
      });
    }

    return {
      test,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>