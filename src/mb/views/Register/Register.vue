<template>
  <div class="d-flex text-center h-100">
    <router-link :to="{ name: 'Login' }" class="register-link">{{ $t("common.login") }}</router-link>
    <form class="register-form" @submit.prevent="onSubmit">
      <p class="mb-5 ft-30 register-ttl">Sign Up</p>
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

      <button type="submit" class="register-btn submit">
        {{ $t("common.register") }}
      </button>
      <button class="register-btn google" @click="googleRegister">
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

    async function googleRegister() {
      await googleTokenLogin().then((response) => {
        data.value = response;
      });
      const res = await PublicApi.googleAuth(data.value, 'register');
      if(!res) {
        return;
      }
      router.push({ name: "Login" });
    }

    return {
      form,
      errors,
      onSubmit,
      googleRegister
    };
  }
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
.register-form {
  min-width: 340px;
  margin: auto;
}
.register-ttl {
  font-family: "Alexandria", sans-serif;
}
.input-area {
  position: relative;
  margin-bottom: 2rem;
}
.register-btn {
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