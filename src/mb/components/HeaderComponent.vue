<template>
  <div class="border">
    <p>i am mb header</p>
    <button @click="test">call modal</button>
    <router-link :to="{ name: 'Login' }">
      {{ $t('common.login') }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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