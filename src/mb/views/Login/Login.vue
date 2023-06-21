<template>
  <div class="d-flex text-center h-100">
    <router-link :to="{ name: 'Register' }" class="register-link">{{ $t("common.register") }}</router-link>
    <form class="login-form" @submit.prevent="onSubmit">
      <p class="mb-5 ft-30 login-ttl">Sign In</p>
      <div class="mb-3">
        <label for="account">{{ $t("form.account") }}</label>
      </div>
      <div class="input-area">
        <el-input v-model="form.account" id="account" />
        <p class="err-msg ft-12 text-color-red">{{ errors.account }}</p>
      </div>

      <div class="mb-3">
        <label for="pwd">{{ $t("form.password") }}</label>
      </div>
      <div class="input-area">
        <el-input v-model="form.password" id="pwd" />
        <p class="err-msg ft-12 text-color-red">{{ errors.password }}</p>
      </div>

      <button type="submit" class="login-btn submit" :disabled="isSubmitting">
        {{ $t("common.login") }}
      </button>
      <button class="login-btn google" @click="googleLogin">
        <i class="btn-icon sns-icon-google"></i>
        <div>{{ $t("form.login_with_google") }}</div>
      </button>
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
    const googleInfo = ref();

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
        googleInfo.value = response;
      });
      const res = await PublicApi.googleAuth(googleInfo.value, 'login');
      if(!res) {
        return;
      }
      store.login(res);
      router.push({ name: "Home" });
    }

    return {
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
.register-link {
  position: absolute;
  right: 6rem;
  top: 6rem;
  border: 1px solid #ccc;
  padding: 8px 20px;
  border-radius: 50px;
}
.login-form {
  min-width: 340px;
  margin: auto;
}
.login-ttl {
  font-family: "Alexandria", sans-serif;
}
.input-area {
  position: relative;
  margin-bottom: 2rem;
}
.login-btn {
  width: 100%;
  height: 50px;
  border-radius: 50px;
  @include flexbox;
  &.submit {
    margin: 15px 0 30px;
    background: #19BC9B;
    color: #fff;
    &:hover,
    &:active {
      background: #17a488;
    }
  }
  &.google {
    border: 1px solid #ccc;
  }
}
.btn-icon {
  width: 25px;
  height: 25px;
  margin-right: 20px;
  @include bg-set;
}
.err-msg {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 7px);
}
:deep(.el-input__wrapper) {
  height: 50px;
  border-radius: 30px;
  &.is-focus {
    box-shadow: 0px 4px 18px -6px rgba(0, 0, 0, 0.2);
  }
  input {
    text-align: center;
  }
}
</style>