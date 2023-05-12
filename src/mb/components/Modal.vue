<template>
  <base-modal :ref="setModalRef">
    <template #header>
      <button class="close-btn" @click="closeModal()">&times;</button>
    </template>
    <template #body>
      <div v-html="message"></div>
    </template>
    <template #footer>
      <button @click="confirm()">{{ $t("common.confirm") }}</button>
    </template>
  </base-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useModal } from "@/base/compositions/modal";
import BaseModal from "@/base/components/BaseModal.vue";

export default defineComponent({
  name: "Modal",
  components: { BaseModal },
  props: {
    okCallBack: {
      type: Function as PropType<() => void>,
      required: false,
    },
    message: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup(props) {
    const { setModalRef, closeModal } = useModal();

    function confirm() {
      props.okCallBack && props.okCallBack();
      closeModal();
    }

    return {
      setModalRef,
      closeModal,
      confirm,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>