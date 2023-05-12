<template>
  <!-- vue-final-modal container -->
  <modals-container />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useApp from '@/base/compositions/app';
import Modal from '@/mb/components/Modal.vue';

export default defineComponent({
  setup() {
    return {
      ...useApp({
        modalComponent: Modal
      })
    };
  },
});
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
