<template>
  <div class="d-flex justify-content-center align-items-center h-75">
    <form class="login-form">
      <div class="my-2">
        <label for="account">account</label>
      </div>
      <el-input id="account" />
      <div class="my-2">
        <label for="pwd">password</label>
      </div>
      <el-input id="pwd" />

      <button class="login-btn">{{ $t('common.login') }}</button>
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