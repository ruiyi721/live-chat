<template>
  <vue-final-modal class="base-modal" :click-to-close="clickToClose">
    <slot name="header"></slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </vue-final-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseModal",
  props: {
    clickToClose: {
      type: Boolean,
      required: false,
      default : false,
    }
  },

  setup(props, { emit }) {

    return {
      emitClose: () => emit('update:modelValue'),
    };
  }
});
</script>

<style lang="scss" scoped>

</style>