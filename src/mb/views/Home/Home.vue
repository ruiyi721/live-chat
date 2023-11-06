<template>
  <div class="ctn">
    <div class="home-bg">
      <div class="text-center position-center text-color-white">
        <p class="title mb-4">Welcome.</p>
        <p>Engineer, designer.</p>
      </div>
    </div>
    <!-- <vue-carousel :items-to-show="1.5" :snap-align="'start'" :wrap-around="true">
      <slide v-for="(item, idx) in carousel" :key="idx">
        <div class="w-100">
          <img :src="item" class="carousel-img" />
        </div>
      </slide>
  
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </vue-carousel> -->
    <!-- <button class="border" @click="checkAuth">測試驗證</button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { PublicApi } from '@/base/apis/public';
import useBaseStore from '@/base/store';

export default defineComponent({
  setup() {
    const store = useBaseStore();

    const carousel = computed(() => store.carousel.images);

    async function checkAuth() {
      const res = await PublicApi.checkAuth();
      if(!res) {
        return
      }
      console.log(res, 'vue home checkauth api');
    }

    return {
      carousel,

      checkAuth,
    };
  },
});
</script>

<style lang="scss" scoped>
.ctn {
 padding-top: 56px;
}

.home-bg {
  height: calc(100vh - 56px);
  width: 100%;
  position: relative;
  @include bg-set;
  background-size: cover;
}

.title {
	font: bold 300% "Poppins", helvetica;
	border-right: .1em solid #fff;
	width: 9ch;
	white-space: nowrap;
	overflow: hidden;
	-webkit-animation: typing 2s steps(21, end),
	  blink-caret .5s step-end infinite alternate;
}

.carousel-img {
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
