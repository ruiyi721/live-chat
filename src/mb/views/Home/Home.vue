<template>
  <div class="home-bg">
    <div class="text-center position-center text-color-white">
      <p class="title mb-4">Hi , I'm Dora Chen.</p>
      <p>Engineer, designer.</p>
    </div>
  </div>
  
  <p v-if="isLogin">{{ $t('common.login') }}</p>
  <button class="border" @click="checkAuth">測試驗證</button>
  <button class="border" @click="logout">登出</button>
  <!-- <vue-carousel :items-to-show="1.5" :snap-align="'start'" :wrap-around="true">
    <slide v-for="(item, idx) in carousel" :key="idx">
      <div class="w-100">
        <img :src="item" class="test-img" />
      </div>
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </vue-carousel> -->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { PublicApi } from '@/base/apis/public';
import { appEmitter, AppEvents } from '@/base/utils/event';
import useBaseStore from '@/base/store';

export default defineComponent({
  setup() {
    const store = useBaseStore();

    const isLogin = computed<boolean>(() => store.isLogin);
    const carousel = computed(() => store.carousel.images);

    async function checkAuth() {
      const res = await PublicApi.checkAuth();
      if(!res) {
        return
      }
      console.log(res, 'vue home checkauth api');
    }

    async function logout() {
      if(!isLogin.value) {
        return;
      }
      appEmitter.emit(AppEvents.Logout);
    }

    return {
      isLogin,

      carousel,

      logout,
      checkAuth,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-bg {
  height: 100vh;
  width: 100%;
  position: relative;
  @include bg-set;
  background-size: cover;
}
.title {
	font: bold 300% "Poppins", helvetica;
	border-right: .1em solid #fff;
	width: 16ch;
	white-space: nowrap;
	overflow: hidden;
	-webkit-animation: typing 2s steps(21, end),
	  blink-caret .5s step-end infinite alternate;
}
.test-img {
  width: 100%;
  object-fit: cover;
}

@keyframes typing {
  from {
    width: 0;
  }
}
@keyframes blink-caret {
  50% {
    border-color: transparent;
  }
}
</style>
