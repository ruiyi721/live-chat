import { defineStore } from 'pinia';
import { ILogin, ICarousels } from '@/base/apis/interfaces/public';
import { PublicApi } from '@/base/apis/public';

export const useBaseStore = defineStore('baseStore', {
  persist: true,
  state: () => {
    const user: ILogin = null;
    const carousel: ICarousels = {
      images: [],
    };

    return {
      user,
      carousel
    }
  },
  getters: {
    isLogin(): boolean {
      return this.user ? true : false;
    }
  },
  actions: {
    init() {
      this.getCarousel();
    },
    login(data: ILogin) {
      if(!data) {
        return;
      }
      localStorage.setItem("token", data.token);
      this.user = data;
    },
    logout() {
      localStorage.removeItem('token');
      this.user = null;
    },
    async getCarousel() {
      const res = await PublicApi.getCarousels();
      if(res) {
        this.carousel = res;
      }
    }
  }
});

export default useBaseStore;
