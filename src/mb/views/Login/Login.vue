<template>
  <div class="d-flex justify-content-center align-items-center h-75">
    <form class="login-form" @submit.prevent="onSubmit">
      <div class="my-2">
        <label for="account">account</label>
      </div>
      <el-input v-model="form.account" id="account" />
      <p class="ft-12 text-color-red mt-1">{{ errors.account }}</p>
      <div class="my-2">
        <label for="pwd">password</label>
      </div>
      <el-input v-model="form.password" id="pwd" />
      <p class="ft-12 text-color-red mt-1">{{ errors.password }}</p>

      <button type="submit" class="login-btn" :disabled="isSubmitting">
        {{ $t("common.login") }}
      </button>
      <button @click="googleLogin">Login Using Google</button>
      <p>{{ data }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { googleTokenLogin } from "vue3-google-login";
import { PublicApi } from '@/base/apis/public';
import useBaseStore from "@/base/store";
import useLoginForm from "@/base/compositions/form/login";

export default defineComponent({
  name: "Login",
  setup() {
    const store = useBaseStore();
    const router = useRouter();
    const data = ref();

    const { form, errors, isSubmitting, onSubmit } = useLoginForm({
      onSubmitCallback: (info) => {
        if (info) {
          store.login(info);
          router.push({ name: "Home" });
        }
      },
    });

    async function googleLogin() {
      await googleTokenLogin().then((response) => {
        data.value = response;
      });
      const res = await PublicApi.googleAuth(data.value, 'login');
      if(!res) {
        return;
      }
      store.login(res);
      router.push({ name: "Home" });
    }

    return {
      data,
      form,
      errors,
      isSubmitting,
      onSubmit,
      googleLogin
    };
  },
});
</script>

<style lang="scss" scoped>
.login-form {
  width: 80%;
}
.login-btn {
  width: 100%;
  height: 40px;
  margin: 30px 0;
  border-radius: 5px;
}
</style>