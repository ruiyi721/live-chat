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
    const config = null;

    return {
      user,
      carousel,
      config
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
    async login(data: ILogin) {
      if(!data) {
        return;
      }
      localStorage.setItem("token", data.token);
      this.user = data;
      const res = await PublicApi.checkAuth();
      if(res) {
        this.config = res;
      }
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
