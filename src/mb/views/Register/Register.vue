<template>
  <div class="d-flex justify-content-center align-items-center h-75">
    <form class="register-form" @submit.prevent="onSubmit">
      <div class="my-2">
        <label for="account">{{ $t("form.account") }}</label>
      </div>
      <el-input v-model="form.account" id="account" />
      <p class="ft-12 text-color-red mt-1">{{ errors.account }}</p>
      <div class="my-2">
        <label for="pwd">{{ $t("form.password") }}</label>
      </div>
      <el-input v-model="form.password" id="pwd" />
      <p class="ft-12 text-color-red mt-1">{{ errors.password }}</p>

      <button type="submit" class="register-btn">
        {{ $t("common.register") }}
      </button>
      <button @click="googleLogin">Register Using Google</button>
      <p>{{ data }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { googleTokenLogin } from "vue3-google-login";
import { PublicApi } from '@/base/apis/public';
import useRegisterForm from "@/base/compositions/form/register";

export default defineComponent({
  name: 'Register',
  setup() {
    const router = useRouter();
    const data = ref();

    const { form, errors, isSubmitting, onSubmit } = useRegisterForm({
      onSubmitCallback: (res) => {
        if(!res) {
          return;
        }
        router.push({ name: "Login" });
      },
    });

    async function googleLogin() {
      await googleTokenLogin().then((response) => {
        data.value = response;
      });
      const res = await PublicApi.googleLogin(data.value, 'register');
      if(!res) {
        return
      }
      console.log(res, 'google login return res');
    }

    return {
      data,
      form,
      errors,
      onSubmit,
      googleLogin
    };
  }
});
</script>

<style lang="scss" scoped>
.register-form {
  width: 80%;
}
.register-btn {
  width: 100%;
  height: 40px;
  margin: 30px 0;
  border-radius: 5px;
}
</style>