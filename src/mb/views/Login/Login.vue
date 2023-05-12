<template>
  <div class="d-flex justify-content-center align-items-center h-75">
    <form class="login-form" @submit.prevent="login">
      <div class="my-2">
        <label for="account">account</label>
      </div>
      <el-input v-model="loginFormData.account" id="account" />
      <div class="my-2">
        <label for="pwd">password</label>
      </div>
      <el-input v-model="loginFormData.password" id="pwd" />

      <button type="submit" class="login-btn">{{ $t('common.login') }}</button>
    </form>
  </div>
</template>

<script src="./Login.ts"></script>

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